<?php


namespace App\Traits;


trait AppResponser
{

    public function successResponse($data, $success = true)
    {
        $data['success'] = $success;
        return response()->json($data, 200);
    }
}
