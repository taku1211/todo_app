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
            'fileName' => ['string', 'max:255','nullable'],

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
        $todo->priority = $request->priority;
        $todo->filename = $request->fileName;
        $todo->delete_flg = $request->deleteFlg;
        $todo->fixed_flg = $request->fixedFlg;
        $todo->complete_flg = $request->completeFlg;
        $todo->save();

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
        $id = Auth::user()->id;
        $allTodoCounts = Todo::where([
            ['user_id', '=', $id],
            ['delete_flg', '=',false],
        ])->get();
        
        if(!empty($allTodoCounts->toArray())){
            return $allTodoCounts;
        }
        
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
