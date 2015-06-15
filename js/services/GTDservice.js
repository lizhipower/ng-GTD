/**
 * Created by Zhi_LI on 2015/5/16.
 */
(function() {
    'use strict';
    GTD.service('GTDservice',['$rootScope','$filter', GTDservice]);

    function GTDservice($rootScope, $filter) {
        var service = {
            data : [
                {ctg: "ife", task:
                    [
                        {
                            name:"task1",
                            content: [
                                {time: "2015-04-21",title:"111",status:true,detail:"aaaaa"},
                                {time: "2015-04-21",title:"222",status:false,detail:"bbbbbb"},
                                {time: "2015-04-21",title:"333",status:false,detail:"cccc"}
                            ]
                        },

                        {
                            name:"task2",
                            content: [
                                {time: "2015-04-22",title:"444",status:false,detail:"dddd"},
                                {time: "2015-04-23",title:"555",status:true,detail:"eeee"},
                                {time: "2015-04-23",title:"666",status:false,detail:"fffff"}
                            ]
                        }
                    ]
                },
                {ctg: "毕业", task:
                    [
                        {
                            name:"task1",
                            content: [
                                {time: "2015-04-21",title:"777",status:true,detail:"gggg"},
                                {time: "2015-04-12",title:"888",status:false,detail:"hhh"},
                                {time: "2015-04-30",title:"999",status:false,detail:"iiii"}
                            ]
                        },

                        {
                            name:"task2",
                            content: [
                                {time: "2015-04-24",title:"101010",status:false,detail:"jjj"},
                                {time: "2015-04-11",title:"111111",status:false,detail:"kkkk"},
                                {time: "2015-04-23",title:"121212",status:true,detail:"llll"}
                            ]
                        }
                    ]
                },
                {ctg: "默认", task:
                    [
                        {
                            name:"task1",
                            content: [
                                {time: "2015-04-23",title:"131313",status:true,detail:"mmmm"},
                                {time: "2015-04-20",title:"141414",status:true,detail:"nnnnn"},
                                {time: "2015-04-21",title:"151515",status:true,detail:"oooo"}
                            ]
                        },

                        {
                            name:"task2",
                            content: [
                                {time: "2015-04-20",title:"161616",status:true,detail:"pppp"},
                                {time: "2015-04-20",title:"171717",status:false,detail:"qqq"},
                                {time: "2015-04-21",title:"181818",status:true,detail:"rrrrr"}
                            ]
                        }
                    ]
                }
            ]
            //,task : {}
            ,todo : []
            ,d : []
            ,ctgNum : 0
            ,tskNum : 0
            ,cttNum : 0
            ,tdNum : 0
            ,tskShow: false
            ,tdShow: false

            ,addTask: function(tskName) {
                var ctgNum = service.ctgNum;
                var tskNum = service.tskNum;
                service.data[ctgNum].task.push({name: tskName, content: []});
                    //.push(data);
                service.formatData();

                $rootScope.$broadcast('dataChanged');

            }
            ,addTd: function(tdName) {
                var ctgNum = service.ctgNum;
                var tskNum = service.tskNum;
                var cttNum = service.cttNum;

                var time;
                console.log(ctgNum, tskNum, cttNum);
                console.log(service.data[ctgNum].task[tskNum].content);
                if (service.data[ctgNum].task[tskNum].content.length != 0) {

                    time = service.data[ctgNum].task[tskNum].content[service.cttNum].time;
                }else{
                    time = "请输入时间";
                }


                    service.data[ctgNum].task[tskNum].content.push({time: time, title: tdName, status: false, detail: ""});

                //service.data[ctgNum].task.push({name: tskName, content: []});
                //.push(data);
                service.formatData();

                $rootScope.$broadcast('dataChanged');
            }
            ,tskClicked: function (ctgName, tskName) {
                var ctgNum, tskNum;
                ctgNum = service.searchCtg(ctgName);
                tskNum = service.searchTsk(ctgNum, tskName);
                service.ctgNum =ctgNum;
                service.tskNum = tskNum;

                service.tskShow =  true;
                service.tdShow = false;

                //console.log(ctgNum);
                //console.log(tskNum);

                //service.task = (service.d[ctgNum].task)[tskNum];
                //service.task = service.formatTsk(service.task);
                $rootScope.$broadcast('tskClicked');
            }
            ,tdClicked: function (tskEle, tdTitle, tdTime) {
                var ctg,tsk,ctt,td;


                var cttNum;
                var tdNum;

                ctg = service.d[service.ctgNum];
                tsk = ctg.task[service.tskNum];
                ctt = tsk.content;

                tdNum = service.searchTd(tskEle, tdTitle);
                service.tdNum = tdNum;

                cttNum = service.searchCtt(tsk.content, tskEle);
                service.cttNum = cttNum;

                td = (ctt[cttNum].todo)[service.tdNum];

                service.tdShow = true;


                //console.log(ctg);
                //console.log(tsk);
                //console.log(td);

                $rootScope.$broadcast('tdClicked');

            }
            ,tdChange: function (title, time, detail, td, mode) {
                var ctgNum,tskNum;
                var cttDataNum,content;

                //console.log(td)

                ctgNum = service.ctgNum;
                tskNum = service.tskNum;

                console.log(title,time,detail);

                content = service.data[ctgNum].task[tskNum].content;
                cttDataNum = service.searchData(content, td.info.title, td.time,td.info.detail);
                if (mode == "confirm") {
                    service.data[ctgNum].task[tskNum].content[cttDataNum].title = title;
                    service.data[ctgNum].task[tskNum].content[cttDataNum].time = time;
                    service.data[ctgNum].task[tskNum].content[cttDataNum].detail = detail;
                }else if (mode == "mark") {
                    service.data[ctgNum].task[tskNum].content[cttDataNum].status = true;

                }



                service.formatData();

            }
            ,searchData: function(content, title,time,detail) {
                var cttDataNum;
                angular.forEach(content, function (val, key) {
                    if (val.detail == detail && val.time == time && val.title == title) {
                        cttDataNum = key;
                        console.log(cttDataNum)
                    }
                });
                return cttDataNum;
            }
            ,searchCtt: function (ctt, tskEle) {
                var cttNum;
                angular.forEach(ctt, function (val, key) {
                    if (val.time == tskEle.time) {
                        cttNum = key;
                    }
                });
                return cttNum;
            }
            ,searchTd: function (tdEle, tdTitle) {
                var todoClicked,todoKey;

                angular.forEach(tdEle.todo, function (val, key) {
                   if (val.title == tdTitle) {
                       todoKey = key;
                   }
                });
                return todoKey;
            }
            ,searchCtg: function (ctgName) {
                var data = service.d;
                var ctgNum;

                angular.forEach(data, function (val, key) {
                    if (val.ctg == ctgName) {
                        ctgNum =  key;
                    }
                });
                return ctgNum;
            }
            ,searchTsk: function(ctgNum, tskName){
                var task = service.d[ctgNum].task;
                var tskNum;
                angular.forEach(task, function(val,key){
                        if (val.name == tskName) {
                            tskNum = key;
                        }
                    }
                );
                return tskNum;
            }
            ,formatTsk: function (task) {
                var content = [], time = [], ctTemp = [], tdTemp = [], taskFmt = {};
                taskFmt.name = task.name;

                //console.log(time)
                var orderBy = $filter('orderBy');
                content = orderBy(task.content, '+time');
                angular.forEach(content, function (val, key) {
                        time.push(val.time);
                });
                time = jQuery.unique(time);
                //console.log(time);
                angular.forEach(time, function (tVal, tKey) {
                    angular.forEach(content, function (cVal, cKey) {
                        if (cVal.time == tVal) {
                            tdTemp.push({title: cVal.title, status: cVal.status, detail: cVal.detail});

                        }
                    });
                    ctTemp.push({time: tVal, todo: tdTemp});
                    tdTemp = [];
                });
                taskFmt.content = ctTemp;
                //console.log(ctTemp);
                return taskFmt;
            }
            ,init: function () {
                service.ctgNum =  service.data.length - 1;
                //console.log(service.ctgNum);
                //console.log(service.data[service.ctgNum]);
                //service.tskNum = service.data[service.ctgNum].task.length - 1;
            }
            ,formatData: function () {
                var d = service.data;
                var dNew = [];
                angular.forEach(d, function (ctgVal, dKey) {
                    dNew[dKey] = {};
                    dNew[dKey].ctg = ctgVal.ctg;
                    dNew[dKey].task = [];

                    angular.forEach(ctgVal.task, function (tskVal, tskKey) {
                        (dNew[dKey].task).push(service.formatTsk(tskVal));
                    });
                });
                service.d = dNew;
                $rootScope.$broadcast('dataChanged');

                //console.log(service.d)
            }
        };
        //service.init();
        service.formatData();
        return service;
    }




})();