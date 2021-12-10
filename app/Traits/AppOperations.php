<?php


namespace App\Traits;


use App\Helpers\TransRef;
use DateTime;
use Exception;
use Illuminate\Support\Facades\App;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use function PHPUnit\Framework\assertIsIterable;

trait AppOperations
{
    public function generalFilter($arrays, $id, $name)
    {

        $data = [];
        foreach ($arrays as $array) {
            $data[$array[$id]] = $array[$name];
        }

        return $data;
    }


    public function getToday()
    {
        date_default_timezone_set("Africa/Lagos");

        return date("Y-m-d");
    }

    public function excelToSQLDate($excelDate)
    {
        $hireDate = Date::excelToDateTimeObject($excelDate);

        return $hireDate->format('Y-m-d');
    }

    public function filterByMajorId($items, $mainId)
    {
        $newItems = [];
        foreach ($items as $item) {
            $newItems[$item[$mainId]] = $item;
        }

        return $newItems;
    }

    public function getSlug($name, $id)
    {
        return str_replace(" ", "-", strtolower($name)) . "-" . $id;
    }

    public function generateRandomName()
    {
        return TransRef::getHashedToken(8);
    }

    public function removeFileFromDirectory($filePath)
    {
        if (file_exists($filePath)) {
            try {
                unlink($filePath);
                return true;
            } catch (Exception $e) {
            }

        }
        return false;
    }

    public function formatDate($oldDate)
    {
        if (empty($oldDate)) {
            return null;
        }

        return date('Y-m-d', strtotime($oldDate));
    }


    public function characterReplacement($template)
    {
        $value = str_replace(" ", "_", trim(strtolower($template)));

        $value = str_replace(["~", "`", "!", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "|", "\\", "<", ">", "?", "/", ".", "'"], "", $value);

        $value = str_replace("@", "at", strtolower($value));

        $value = $this->combineWords(explode("_", $value));

        return $value;
    }

    public function combineWords($words)
    {
        $text = "";
        foreach ($words as $word) {
            if (!empty($word)) {
                $text .= "_" . trim($word);
            }
        }
        return trim($text, "_");
    }

    public function flattenName($name)
    {
        $name = str_replace(" ", "_", $name);
        return strtolower($name);

    }

    public function checkNestedItemExist($items, $type, $id, $amount)
    {
        if (!empty($items[$type][$id])) {
            $items[$type][$id] += $amount;

        } else {
            $items[$type][$id] = $amount;
        }

        return $items;
    }


    public function buildPagination($page)
    {
        $total = $page->total();
        $currentPage = $page->currentPage();
        $currentTotal = $page->count();
        $perPage = $page->perPage();
        $from = $page->firstItem();
        $to = $page->lastItem();
        $lastPage = $page->lastPage();
        return [
            'total' => $total,
            'from' => $from,
            'currentPage' => $currentPage,
            'currentTotal' => $currentTotal,
            'perPage' => $perPage,
            'lastPage' => $lastPage,
            'to' => $to,
        ];
    }

    public function mergeTwoArray($array1, $array2)
    {

        $mainArray = [];
        $subArray = [];
        if (!empty($array1)) {
            $mainArray = $array1;
            if (!empty($array2)) {
                $subArray = $array2;
            }

        } elseif (!empty($array2)) {

            return $array2;
        }

        foreach ($mainArray as $item) {

            if (!in_array($item, $subArray)) {
                $subArray[] = $item;
            }
        }

        return $subArray;
    }

    public function getRealDate($date)
    {

        try {

            return new DateTime($date);
        } catch (Exception $e) {

        }

        return new DateTime();
    }

    public function convertEpochToReadableDateTime($epoch, $divisor = 1000)
    {
        date_default_timezone_set("Africa/Lagos");

        return date('Y-m-d H:i:s', $epoch / $divisor);
    }

    public function convertReadableDateTimeToEpoch($datetime, $multiple = 1000)
    {
        date_default_timezone_set("Africa/Lagos");
        return strtotime($datetime) * $multiple;
    }

    public function buildModelFromString($modelName)
    {
        return "App\Models\\" . $modelName;
    }
}


