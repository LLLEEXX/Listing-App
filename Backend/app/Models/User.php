<?php
namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, HasUuids, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'fullname',
        'password',
        'nationality',
        'username',
        'mobileNum',
        'email',
        'gender',
        'role',
        'recieveUpdate',
        'termsandCon',
        'updated_at',
        'created_at',
    ];
    protected $hidden = [
        'password'
    ];

    public function isAdmin()
    {
        return $this->role === 'admin';
    }
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    // Get the email address for email verification
    public function getEmailForVerification()
    {
        return $this->email;
    }

    // Send email verification notification
    public function sendEmailVerificationNotification()
    {
        $this->notify(new \Illuminate\Auth\Notifications\VerifyEmail);
    }

    public function subscription()
    {
        return $this->hasOne(UserSubscription::class);
    }

    public function profile_image()
    {
        return $this->hasOne(profile_image::class, 'user_id');
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

}
?>