<?php


namespace App\Traits;


trait AppQuery
{
    public function getListByDoubleColumns($column1, $value1, $column2, $value2, $list, $object, $operator = "=", $take = 0)
    {
        $perPage = 5;
        $orderBy = "created_at";
        $direction = "desc";
        if (request()->has('per_page')) {
            $perPage = request()->get('per_page');
        }

        if (request()->has('sort_by')) {
            $orderBy = request()->get('sort_by');
        }

        if (request()->has('direction')) {
            $direction = request()->get('direction');
        }


        if ($take > 0) {
            return $object->select($list)
                ->where($column1, $value1)
                ->where($column2, $operator, $value2)
                ->take($take)->orderBy($orderBy, $direction)->get()->toArray();
        }


        return $object->select($list)
            ->where($column1, $value1)
            ->where($column2, $operator, $value2)
            ->orderBy($orderBy, $direction)
            ->get()->toArray();

    }


    public function getAllList($list, $object)
    {

        $orderBy = "created_at";
        $direction = "desc";
        if (request()->has('sort_by')) {
            $orderBy = request()->get('sort_by');
        }

        if (request()->has('direction')) {
            $direction = request()->get('direction');
        }
        return $object->select($list)
            ->orderBy($orderBy, $direction)
            ->get();


    }

    protected function searchQuery(Model $instance, array $fields, $searchQuery)
    {
        $data = [];
        $perPage = 5;
        $orderBy = "created_at";
        $direction = "desc";

        $data = $instance->where('created_at', '!=', NULL)->where(function ($query) use ($fields, $searchQuery) {
            foreach ($fields as $field) {
                $query->orWhere($field, 'LIKE', "%" . $searchQuery . "%");
                $query->orWhere($field, 'REGEXP', $searchQuery);
            }
        })
            ->get();

        // ->orderBy($orderBy, $direction)->paginate($perPage);
        $data = collect($data);

        return $data;


    }

    public function getSingleQueryByColumn($column, $value, $list, $object, $operator = "=")
    {


        $data = $object->select($list)
            ->where($column, $operator, $value)
            ->get()->toArray();
        if (!empty($data[0])) {
            return $data[0];
        }

        return [];

    }

    public function getSingleQueryByDualColumns($column1, $value1, $column2, $value2, $list, $object, $operator = "=")
    {


        $data = $object->select($list)
            ->where($column1, $value1)
            ->where($column2, $operator, $value2)
            ->get()->toArray();
        if (!empty($data[0])) {
            return $data[0];
        }

        return [];

    }

    public function getListByColumn($column, $value, $list, $object, $operator = "=", $orderBy = "id", $direction = "asc")
    {

        return $object->select($list)
            ->where($column, $operator, $value)
            ->orderBy($orderBy, $direction)
            ->get()->toArray();
    }

    public function countBySingleColumn($object, $column, $value, $countBy = "id", $operator = "=")
    {
        return $object->where($column, $operator, $value)->count($countBy);
    }

    public function countByDoubleColumn($object, $column1, $value1, $column2, $value2, $countBy = "id", $operator = "=")
    {
        return $object->where($column1, $operator, $value1)
            ->where($column2, $value2)
            ->count($countBy);
    }

    public function getListByDoubleColumn($column1, $value1, $column2, $value2, $list, $object, $operator = "=", $take = 0, $orderBy = 'id', $direction = 'asc')
    {
        if ($take > 0) {
            return $object->select($list)
                ->where($column1, $value1)
                ->where($column2, $operator, $value2)
                ->take($take)->get()->toArray();
        }


        return $object->select($list)
            ->where($column1, $value1)
            ->where($column2, $operator, $value2)
            ->orderBy($orderBy, $direction)
            ->get()->toArray();

    }

    public function updateSingleColumn($object, $column, $value, $updateColumn, $byValue)
    {

        $object->where($column, $value)->update([
            $updateColumn => $byValue,
        ]);
    }

    public function updateDoubleColumn($object, $column, $value, $updateColumn1, $byValue1, $updateColumn2, $byValue2)
    {

        $save = $object->where($column, $value)->update([
            $updateColumn1 => $byValue1,
            $updateColumn2 => $byValue2,
        ]);

        return $save;
    }

    public function updateDoubleDualColumns($object, $column1, $value1, $column2, $value2, $updateColumn1, $byValue1, $updateColumn2, $byValue2)
    {

        $object->where($column1, $value1)
            ->where($column2, $value2)
            ->update([
                $updateColumn1 => $byValue1,
                $updateColumn2 => $byValue2,
            ]);
    }

    public function updateSingleDualColumn($object, $column1, $value1, $column2, $value2, $updateColumn, $byValue)
    {

        $object->where($column1, $value1)
            ->where($column2, $value2)
            ->update([
                $updateColumn => $byValue,
            ]);
    }

    public function updateDoubleTriColumns($object, $column1, $value1, $column2, $value2, $column3, $value3, $updateColumn1, $byValue1, $updateColumn2, $byValue2, $operator = '=')
    {

        $status = $object->where($column1, $value1)
            ->where($column2, $value2)
            ->where($column3, $operator, $value3)
            ->update([
                $updateColumn1 => $byValue1,
                $updateColumn2 => $byValue2,
            ]);
        return $status;
    }

    public function updateDoubleFourColumns($object, $column1, $value1, $column2, $value2, $column3, $value3, $updateColumn1, $byValue1, $updateColumn2, $byValue2, $updateColumn3, $byValue3, $operator = '=')
    {

        $status = $object->where($column1, $value1)
            ->where($column2, $value2)
            ->where($column3, $operator, $value3)
            ->update([
                $updateColumn1 => $byValue1,
                $updateColumn2 => $byValue2,
                $updateColumn3 => $byValue3,
            ]);
        return $status;
    }


    public function getListByTriColumnPaginate($column1, $value1, $column2, $value2, $column3, $value3, $list, $object, $operator = "=")
    {

        return $object->select($list)
            ->where($column1, $value1)
            ->where($column2, $value2)
            ->where($column3, $operator, $value3)
            ->latest()
            ->paginate(40);

    }

    public function getListByTriColumn($column1, $value1, $column2, $value2, $column3, $value3, $list, $object, $oderBy, $direction, $operator = "=")
    {

        return $object->select($list)
            ->where($column1, $value1)
            ->where($column2, $value2)
            ->where($column3, $operator, $value3)
            ->orderBy($oderBy, $direction)->get()->toArray();


    }

    public function getListByColumnPaginate($column, $value, $list, $object, $operator = "=", $orderBy = "id", $direction = "asc", $perPage = 40)
    {
        return $object->select($list)
            ->where($column, $operator, $value)
            ->orderBy($orderBy, $direction)
            ->paginate($perPage);

    }

    public function getListByDoubleColumnPaginate($column1, $value1, $column2, $value2, $list, $object, $operator = "=",$orderBy = "id", $direction = "asc", $perPage = 40)
    {

        return $object->select($list)
            ->where($column1, $value1)
            ->where($column2, $operator, $value2)
            ->orderBy($orderBy, $direction)
            ->paginate($perPage);

    }

    public function registerLog($companyId, $userId, $type, $message)
    {
        date_default_timezone_set("Africa/Lagos");
//        $title = $this->getTitle();
//        $log = new ActionLog();
//        $log->company_id = $companyId;
//        $log->user_id = $userId;
//        $log->title = $title[$type]['name'];
//        $log->type = $type;
//        $log->message = $message;
//        $log->save();

    }

    public function getTitle()
    {
        return [
            1 => ['name' => 'Authentication', 'color' => '#66ff48'],
            2 => ['name' => 'Create', 'color' => '#2e87ff'],
            3 => ['name' => 'Update', 'color' => '#fa8c16'],
            4 => ['name' => 'Delete', 'color' => '#ff2812'],
            5 => ['name' => 'Import', 'color' => '#e63cff'],
            6 => ['name' => 'Export', 'color' => '#ef25b8'],
            7 => ['name' => 'Payroll', 'color' => '#d10ec1'],
            8 => ['name' => 'Comment', 'color' => '#370ed1'],
            9 => ['name' => 'Approval', 'color' => '#ef8425'],
            10 => ['name' => 'Security', 'color' => '#ef8425'],
            11 => ['name' => 'Mail', 'color' => '#d10ec1'],

        ];
    }

}
