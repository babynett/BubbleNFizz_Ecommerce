<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserPolls;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserManagementController extends Controller
{
    public function getAllEmployees()
    {
        return User::where('user_role', 2)->get();
    }

    public function getAllCustomers()
    {
        return User::where('user_role', 3)->with('profile')->get();
    }

    public function addEmployee(Request $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'email' => 'required | unique:users | email',
        // ]);

        // if ($validator->fails()) {
        //     return $validator;
        // }

        $user = User::create([
            'name' => $request->fname . " " . $request->lname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_role' => 2,
        ]);

        if (!$user) {
            return 'false';
        }

        return 'true';
    }

    public function addCustomer(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_role' => 3,
        ]);

        $userProfile = UserProfile::create([
            'user_id' => $user->id,
            'birthday' => $request->birthday,
            'address' => $request->address,
            'city' => $request->city,
            'postal_code' => $request->postal_code,
            'contact_no' => $request->contact_number,
        ]);

        if (!$user) {
            return 'false';
        }

        return 'true';
    }

    public function addUserPoll(Request $request)
    {
        $userPoll = UserPolls::create([
            'user_id' => $request->user_id,
            'gender' => $request->gender,
            'fragrance' => $request->scent,
            'location' => $request->location,
            'ingredients' => $request->ingredients,
            'texture' => $request->texture,
            'design' => $request->design,
            'age_bracket' => $request->age_bracket,
            'frequency' => $request->frequency,
            'bath_type' => $request->bath_type
        ]);

        if ($userPoll) {
            return 'true';
        }
        
        return 'false';
    }

    public function addUserProfile(Request $request)
    {
        $userProfile = UserProfile::create([
            'user_id' => $request->user_id,
            'birthday' => $request->birthday,
            'address' => $request->address,
            'city' => $request->city,
            'postal_code' => $request->postal_code,
            'contact_no' => $request->contact_no
        ]);

        if ($userProfile) {
            return 'true';
        }

        return 'false';
    }

    public function suspendUser(Request $request) 
    {
        return User::where('id', $request->id)
            ->update([
                'is_suspended' => true,
            ]);
    }

    public function unsuspendUser(Request $request)
    {
        return User::where('id', $request->id)
            ->update([
                'is_suspended' => false,
            ]);
    }

    public function getUserPoll(Request $request)
    {
        return UserPolls::where('user_id', $request->user_id)->first();
    }

    public function deleteEmployee(Request $request)
    {
        return User::where('id', $request->id)->delete();
    }
}
