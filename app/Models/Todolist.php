<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todolist extends Model
{
    use HasFactory;
    protected $table ='lists';

    protected $fillable = ['name', 'user_id','color', 'fixed_flg', 'delete_flg'];

    
}
