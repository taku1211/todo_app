<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todolist;
use App\Models\Todocategory;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Database\QueryException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TodosController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except('forgetPassword','deleteUser');   
    }

    public function registerTodo(Request $request)
    {
        $todo = new Todo;

        $request->validate([
            'name' =>[ 'required', 'string', 'max:255'],
            'listId' => ['int', 'nullable'],
            'categoryId' => ['int','nullable'],
            'detail' => ['string', 'max:500','nullable'],
            'cycle' => ['int','nullable'],
            'place' => ['string', 'max:255','nullable'],
            'priority' => ['int','nullable'],
            'fileName' => ['image', 'mimes:jpg,jpeg,png,gif','max:2048','nullable'],
        ]);

            $todo->user_id = Auth::user()->id;
            $todo->name = $request->name;
            $todo->list_id = $request->listId;
            $todo->category_id = $request->categoryId;
            $todo->detail = $request->detail;
            $todo->todo_date = $request->todoDate;
            $todo->todo_time = $request->todoTime;
            $todo->cycle = $request->cycle;
            $todo->place = $request->place;
            $todo->priority = $request->priority;
            $todo->filename = $request->fileName;
            $todo->save();
            return $todo;
    }

    public function registerTodoWithImg(Request $request)
    {
        $request->validate([
            'name' =>[ 'required', 'string', 'max:255'],
            'listId' => ['int','nullable'],
            'categoryId' => ['int','nullable'],
            'detail' => ['string', 'max:500','nullable'],
            'cycle' => ['int','nullable'],
            'place' => ['string', 'max:255','nullable'],
            'priority' => ['int','nullable'],
            'fileName' => ['file', 'mimes:jpg,jpeg,png,gif','max:2048','nullable'],
        ]);

        $randomName = Str::random(12); 
        $extension = $request->fileName->extension();
        $getFileName = $randomName.'.'.$extension;
        $img = $request->file('fileName');
        Storage::cloud()->putFileAs('',$img, $getFileName,'public');

        $todo = new Todo;

        if($request->listId === null){
            $list_id = null;
        }else{
            $list_id = $request->listId *1;
        }
        if($request->categoryId === null){
            $category_id = null;
        }else{
            $category_id = $request->categoryId *1;
        }

        DB::beginTransaction();
        try{
            $todo->user_id = Auth::user()->id;
            $todo->name = $request->name;
            $todo->list_id = $list_id;
            $todo->category_id = $category_id;
            $todo->detail = $request->detail;
            $todo->todo_date = $request->todoDate;
            $todo->todo_time = $request->todoTime;
            $todo->cycle = $request->cycle *1;
            $todo->place = $request->place;
            $todo->priority = $request->priority *1;
            $todo->filename = $getFileName;
            $todo->save();
            DB::commit();
            return $todo;
        } catch (\Exception $exception){
            DB::rollback();
            Storage::cloud()->delete($getFileName);
            throw $exception;
        }

    }
    public function updateTodo(Request $request)
    {
        $request->validate([
            'name' =>[ 'required', 'string', 'max:255'],
            'listId' => ['int', 'nullable'],
            'categoryId' => ['int','nullable'],
            'detail' => ['string', 'max:500','nullable'],
            'cycle' => ['int','nullable'],
            'place' => ['string', 'max:255','nullable'],
            'priority' => ['int','nullable'],
            'fileName' => ['string', 'max:255','nullable'],
        ]);
        

        $todo = Todo::find($request->id);

            $todo->name = $request->name;
            $todo->list_id = $request->listId;
            $todo->category_id = $request->categoryId;
            $todo->detail = $request->detail;
            $todo->todo_date = $request->todoDate;
            $todo->todo_time = $request->todoTime;
            $todo->cycle = $request->cycle;
            $todo->place = $request->place;
            $todo->filename = $request->fileName;
            $todo->priority = $request->priority;
            $todo->delete_flg = $request->deleteFlg;
            $todo->fixed_flg = $request->fixedFlg;
            $todo->complete_flg = $request->completeFlg;
            $todo->save();
    }
    public function updateTodoWithImg(Request $request)
    {
        $request->validate([
            'name' =>[ 'required', 'string', 'max:255'],
            'listId' => ['int', 'nullable'],
            'categoryId' => ['int','nullable'],
            'detail' => ['string', 'max:500','nullable'],
            'cycle' => ['int','nullable'],
            'place' => ['string', 'max:255','nullable'],
            'priority' => ['int','nullable'],
            'fileName' => ['file','max:2048','mimes:jpg,jpeg,png,gif','nullable'],
        ]);

        $randomName = Str::random(12); 
        $extension = $request->fileName->extension();
        $getFileName = $randomName.'.'.$extension;
        $img = $request->file('fileName');
        Storage::cloud()->putFileAs('',$img, $getFileName,'public');

        if($request->databaseImg !== ""){
            Storage::cloud()->delete($request->databaseImg);
        }

        $todo = Todo::find($request->id*1);

        if($request->listId === null){
            $list_id = null;
        }else{
            $list_id = $request->listId *1;
        }
        if($request->categoryId === null){
            $category_id = null;
        }else{
            $category_id = $request->categoryId *1;
        }
        DB::beginTransaction();
        try{
            $todo->name = $request->name;
            $todo->list_id = $list_id;
            $todo->category_id = $category_id;
            $todo->detail = $request->detail;
            $todo->todo_date = $request->todoDate;
            $todo->todo_time = $request->todoTime;
            $todo->cycle = $request->cycle *1;
            $todo->place = $request->place;
            $todo->priority = $request->priority *1;
            $todo->filename = $getFileName;
            $todo->save();
            DB::commit();
            return $todo;
        } catch (\Exception $exception){
            DB::rollback();
            Storage::cloud()->delete($getFileName);
            throw $exception;
        }
    }
    public function deleteTodoRelateCategory(Request $request)
    {
        Todo::where('category_id', $request->categoryId)->update([
            'delete_flg' => true,
        ]);
    }
    public function deleteCategoryRelateList(Request $request)
    {
        TodoCategory::where('list_id',$request->listId)->update([
            'delete_flg' => true,
        ]);
    }
    public function deleteTodoRelateList(Request $request)
    {
        Todo::where('list_id', $request->listId)->update([
            'delete_flg' => true,
        ]);
    }

    public function registerList(Request $request)
    {
        $list = new Todolist;
        
        $request->validate([
        'name' =>[ 'required','string', 'max:255'],
        'color' => ['required', 'int'],
                
        ]);
        $list->user_id = $request->userId;
        $list->name = $request->name;
        $list->color = $request->color;
        $list->delete_flg = $request->deleteFlg;
        $list->fixed_flg = $request->fixedFlg;
        $list->save(); 
    }
    public function updateList(Request $request)
    {
        $list = TodoList::find($request->id);
       
        $request->validate([
        'name' =>[ 'required','string', 'max:255'],
        'color' => ['required', 'int'],
        ]);
        $list->user_id = Auth::user()->id;
        $list->name = $request->name;
        $list->color = $request->color;
        $list->delete_flg = $request->deleteFlg;
        $list->fixed_flg = $request->fixedFlg;
        $list->save(); 
    }
    public function deleteList(Request $request)
    {
        $list = Todolist::find($request->id);

        $list->delete_flg = true;
        $list->save();
    }

    public function registerCategory(Request $request)
    {
        $category = new Todocategory;

        $request->validate([
            'name' =>[ 'required', 'string', 'max:255'],
            'color' => ['required', 'int'],
        ]);

        $category->user_id = Auth::user()->id;
        $category->list_id = $request->listId;
        $category->name = $request->name;
        $category->color = $request->color;
        $category->delete_flg = $request->deleteFlg;
        $category->fixed_flg = $request->fixedFlg;
        $category->save();
    }
    public function updateCategory(Request $request)
    {
        $category = Todocategory::find($request->id);

        $request->validate([
            'name' =>[ 'required','string', 'max:255'],
            'color' => ['required', 'int'],
            ]);
        $category->name = $request->name;
        $category->color = $request->color;
        $category->delete_flg = $request->deleteFlg;
        $category->fixed_flg = $request->fixedFlg;
        $category->save(); 
    }
    public function deleteCategory(Request $request)
    {
        $category = Todocategory::find($request->id);

        $category->delete_flg = true;
        $category->save();
    }
    public function indexList()
    {
        $id = Auth::user()->id;
        $lists = Todolist::where([
            ['user_id', '=', $id],
            ['delete_flg', '=',false],
        ])->get();

        return $lists;
    }
    public function indexCategory(Request $request)
    {
        $user_id = Auth::user()->id;
        $list_id = $request->fetchListId;
        $categorys = Todocategory::where([
            ['user_id', '=', $user_id],
            ['list_id', '=', $list_id],
            ['delete_flg', '=', false],
            
        ])->get();

        return $categorys;
    }
    public function indexAllCategorys()
    {
        $id=Auth::user()->id;
        $categorys = TodoCategory::where([
            ['user_id','=',$id],
            ['delete_flg', '=', false],
        ])->get();

        return $categorys;
    }
    public function countAllTodo()
    {

        $today = date('Y-m-d');
        $date = date('w');
        $yesterday = date('Y-m-d', strtotime('-1 day'));
        //6日後（昨日から数えて一週間後）
        $dateAfter6days = date('Y-m-d',strtotime('+6 day'));
        //日曜日TODO→次の土曜日TODOに
        $dateAfter5days = date('Y-m-d',strtotime('+5 day'));
        //金曜日TODO→月曜日TODOに
        $dateAfter2days = date('Y-m-d',strtotime('+2 day'));
        //昨日の日付から一か月後
        $dateAfterMonth = date('Y-m-d', strtotime($yesterday.'+1 month'));
        $dateAfterYear = date('Y-m-d', strtotime($yesterday.'+1 year'));


        $cycleEveryDayTodo = Todo::where([
            ['cycle', '=', 1],
            ['todo_date', '<', $today]
        ])->update([
            'complete_flg' => false,
            'todo_date' => $today,
        ]);
        switch($date){
            case 0://日曜日→毎週土曜日更新のTODOを次の土曜日に更新する
                $cycleSaturdayTodo =  Todo::where([
                    ['cycle', '=', 10],
                    ['todo_date', '<', $today]
                ])->update([
                    'complete_flg' => false,
                    'todo_date' => $dateAfter6days,
                ]);
                   //週末繰り返しのTODOを今日（日曜日）に更新する
                $cycleSaturdayTodo =  Todo::where([
                    ['cycle', '=', 3],
                    ['todo_date', '<', $today]
                ])->update([
                    'complete_flg' => false,
                    'todo_date' => $today,
                ]);
                break;

            case 1://月曜日→毎週日曜日更新のTODOを次の日曜日に更新する
                $cycleSundayTodo =  Todo::where([
                    ['cycle', '=', 4],
                    ['todo_date', '<', $today]
                ])->update([
                    'complete_flg' => false,
                    'todo_date' => $dateAfter6days,
                ]);
                   //週末繰り返しのTODOを次の土曜日に更新する
                $cycleSaturdayTodo =  Todo::where([
                    ['cycle', '=', 3],
                    ['todo_date', '<', $today]
                ])->update([
                    'complete_flg' => false,
                    'todo_date' => $dateAfter5days,
                ]);
                break;

            case 2://火曜日→毎週月曜日更新のTODOを次の月曜日に更新する
                $cycleMondayTodo =  Todo::where([
                    ['cycle', '=', 5],
                    ['todo_date', '<', $today]
                ])->update([
                    'complete_flg' => false,
                    'todo_date' => $dateAfter6days,
                ]);
                   //平日繰り返しのTODOを今日（火曜日）に更新する
                $cycleWeekTodo = Todo::where([
                    ['cycle', '=', 2],
                    ['todo_date', '<', $today]
                ])->update([
                    'complete_flg' => false,
                    'todo_date' => $today,
                ]);
                break;

            case 3://水曜日→毎週火曜日更新のTODOを次の火曜日に更新する
                $cycleTuesdayTodo =  Todo::where([
                    ['cycle', '=', 6],
                    ['todo_date', '<', $today]
                ])->update([
                    'complete_flg' => false,
                    'todo_date' => $dateAfter6days,
                ]);
                   //平日繰り返しのTODOを今日（水曜日）に更新する
                $cycleWeekTodo = Todo::where([
                    ['cycle', '=', 2],
                    ['todo_date', '<', $today]
                ])->update([
                    'complete_flg' => false,
                    'todo_date' => $today,
                ]);
                break;

            case 4://木曜日→毎週水曜日更新のTODOを次の水曜日に更新する
                $cycleWednesdayTodo =  Todo::where([
                    ['cycle', '=', 7],
                    ['todo_date', '<', $today]
                ])->update([
                    'complete_flg' => false,
                    'todo_date' => $dateAfter6days,
                ]);
                   //平日繰り返しのTODOを今日（木曜日）に更新する
                $cycleWeekTodo = Todo::where([
                    ['cycle', '=', 2],
                    ['todo_date', '<', $today]
                ])->update([
                    'complete_flg' => false,
                    'todo_date' => $today,
                ]);
                break;

            case 5://金曜日→毎週木曜日更新のTODOを次の木曜日に更新する
                $cycleThursdayTodo =  Todo::where([
                    ['cycle', '=', 8],
                    ['todo_date', '<', $today]
                ])->update([
                    'complete_flg' => false,
                    'todo_date' => $dateAfter6days,
                ]);
                   //平日繰り返しのTODOを今日（金曜日）に更新する
                $cycleWeekTodo = Todo::where([
                    ['cycle', '=', 2],
                    ['todo_date', '<', $today]
                ])->update([
                    'complete_flg' => false,
                    'todo_date' => $today,
                ]);
                break;

            case 6://土曜日→毎週金曜日更新のTODOを次の金曜日に更新する
                $cycleFridayTodo =  Todo::where([
                    ['cycle', '=', 9],
                    ['todo_date', '<', $today]
                ])->update([
                    'complete_flg' => false,
                    'todo_date' => $dateAfter6days,
                ]);
                   //平日繰り返しのTODOを次の月曜日に更新する
                $cycleWeekTodo = Todo::where([
                    ['cycle', '=', 2],
                    ['todo_date', '<', $today]
                ])->update([
                    'complete_flg' => false,
                    'todo_date' => $dateAfter2days,
                ]);

                break;


        }
        $cycleEveryWeekTodo = Todo::where([
            ['cycle', '=', 11],
            ['todo_date', '<', $today]
        ])->update([
            'complete_flg' => false,
            'todo_date' => $dateAfter6days,
        ]);
        $cycleEveryMonthTodo = Todo::where([
            ['cycle', '=', 12],
            ['todo_date', '<', $today]
        ])->update([
            'complete_flg' => false,
            'todo_date' => $dateAfterMonth,
        ]);
        $cycleEveryYearTodo =  Todo::where([
            ['cycle', '=', 13],
            ['todo_date', '<', $today]
        ])->update([
            'complete_flg' => false,
            'todo_date' => $dateAfterYear,
        ]);


        $id = Auth::user()->id;
        $allTodoCounts = Todo::where([
            ['user_id', '=', $id],
            ['delete_flg', '=',false],
        ])->get();

         return $allTodoCounts;
        
    }
    public function updateName(Request $request)
    {
        $user_id = Auth::user()->id;
        $my_email = Auth::user()->email;
        $request->validate([
            'name' =>['bail', 'required', 'string', 'max:255'],
        ]);
    
        $user = User::find($user_id);
        $user->name = $request->name;
        $user->save();
        
        return $user;
    }
    public function updateEmail(Request $request)
    {
        $user_id = Auth::user()->id;
        $my_email = Auth::user()->email;
        $request->validate([
            'email' =>['bail','required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->whereNot('email', $my_email)],
        ]);
    
        $user = User::find($user_id);
        $user->email = $request->email;
        $user->save();
        return $user;
    }
    public function updatePassword(Request $request)
    {
        $user_id = Auth::user()->id;
        $request->validate([
            'currentPassword' =>['bail', 'required', 'current_password'],
            'password' => ['bail','required', 'string', 'min:8', 'confirmed'],
        ]);
    
        $user = User::find($user_id);
        $user->password = Hash::make($request->password);
        $user->save();
        
        return $user;
    }
    public function forgetPassword(Request $request)
    {
        $name = $request->name;
        $email = $request->email;
        $request->validate([
            'name' => ['bail', 'required',Rule::exists('users','name')->where(function($query) use ($request){
                $searchEmail = $request->email;
                return $query->where('email',$searchEmail);
            }),],
            'email' => ['bail', 'required' ],
            'password' => ['bail','required', 'string', 'min:8', 'confirmed'],
        ]);
            
            $user = User::where([
                ['email','=',$email]
            ])->update([
                'password' => Hash::make($request->password)
            ]);

    }
    public function deleteUser(Request $request)
    {
        $user_id = Auth::user()->id;
        $user = User::find($user_id);
        $user->delete();

        return $user;
    }


    
}
