<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;
    protected $table = "todos";

    protected $fillable = ['name', 'user_id', 'list_id', 'category_id', 'detail', 
                            'todo_date', 'todo_time', 'cycle', 'place', 'priority', 'filename', 'fixed_flg', 'delete_flg','complete_flg'];
                            
}
