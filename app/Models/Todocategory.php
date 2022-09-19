<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todocategory extends Model
{
    use HasFactory;
    protected $table ='categorys';

    protected $fillable = ['name', 'user_id','list_id','color', 'fixed_flg', 'delete_flg'];

    
}
