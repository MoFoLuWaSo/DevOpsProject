<?php


namespace App\Traits;


trait AppTransactions
{

    public function httpPost($url, $params, $header)
    {


        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_POST, true);
        // curl_setopt($ch, CURLOPT_POST, count($params));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);

        $output = curl_exec($ch);

        curl_close($ch);


        return $output;


    }

    public function httpGet($url, $header)
    {


//Initialize cURL.
        $ch = curl_init();

//Set the URL that you want to GET by using the CURLOPT_URL option.
        curl_setopt($ch, CURLOPT_URL, $url);

//Set CURLOPT_RETURNTRANSFER so that the content is returned as a variable.
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

//Set CURLOPT_FOLLOWLOCATION to true to follow redirects.
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
//Set Header Added be foluso
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);

//Execute the request.
        $output = curl_exec($ch);

//Close the cURL handle.
        curl_close($ch);

//Print the data out onto the page.


        return $output;

    }
}
