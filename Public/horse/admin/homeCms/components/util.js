/**
 * Created by lvliqi on 2017/6/24.
 */

export let start_time = (moment) => {
    moment.seconds(0);
    moment.minutes(0);
    return moment.unix();
};

export let end_time = (moment) => {
    moment.seconds(59);
    moment.minutes(59);
    return moment.unix();
};