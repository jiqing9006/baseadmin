<?php

class Tencent
{
    static public function getGeo($address)
    {
        $url = 'http://apis.map.qq.com/ws/geocoder/v1/?address='.$address;
        $url .= '&key='.C('TENCENT_MAP.KEY');

        $data = json_decode(file_get_contents($url), true);
        
        if ($data['status'] != 0) {
            return false;
        }

        return $data['result']['location'];
    
    }
}
