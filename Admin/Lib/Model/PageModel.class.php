<?php
class PageModel extends Model{
    /*
     *此函数分页函数。传入表名和当前页，返回 总页数，总条数 底标的分页的数组
    */
    public function index($tableName,$page,$where,$prefix_page, $sql = '', $add_one_flag = false){
        $tables = M($tableName);
        //第一返回总条数
        if($sql){
            $tmp = $tables->query($sql);
            $data['count'] = $tmp[0]['count_num'];
        }else{
            if($where){
                $data['count']=$tables->where($where)->count();
            }else{
                $data['count']=$tables->count();

            }
        }
        if($add_one_flag == true){
            $data['count'] += 1;
        }

        $page_step = C('PAGE_NORMAL_COUNT');
        //第二返回总页数
        $data['page_all']=(int)ceil($data['count']/$page_step);

        //第三返回底标的分页数组
        $page_start=$page-2;
        if($data['page_all']>5){
            if($page_start<=0){
                $page_start=1;
                $page_end=5;
            }else{
                $page_end=$page+2;
                if($page_end>=$data['page_all']){
                    $page_end=$data['page_all'];
                    $page_start=$page_end-4;
                }
            }
        }else{
            $page_start=1;
            $page_end=$data['page_all'];
        }
        $data['page_start']=$page_start;
        $data['page_end']=$page_end;
        //第四返回当前页
        $data['page']=$page;
        //第五 返回上一页和下一页
        $prev_page=$page-1;
        if($prev_page<=0){
            $prev_page=1;
        }
        $next_page=$page+1;
        if($next_page>=$data['page_all']){
            $next_page=$data['page_all'];
        }

        $data['prev_page']=$prev_page;
        $data['next_page']=$next_page;
        $data['prefix_page']=$prefix_page;

        //added zhubin
        $query_string = $_SERVER['QUERY_STRING'];
        $pos = strpos($query_string,'&');
        if ($pos){
            $my_query_string = substr($query_string,$pos);
            $data['tail'] = $my_query_string;
        }
        return $data;
    }
}