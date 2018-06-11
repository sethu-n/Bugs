app.service('DataService', function ($http, $q) {
    
    this.getUserName=function(){
        return sessionStorage.getItem('userName');
    }
    this.setUserName=function(userName){
        sessionStorage.setItem('userName',userName);
        //add current user to the users list
        this.addNew('usersList',{'userName' : userName})
    }

    //get data from the local storage if not load it from JSON
    this.getData = function (dataSource) {
        var deferred = $q.defer();
        var result;
        if (!sessionStorage.getItem(dataSource)) {
            $http.get(`assets/jsons/${dataSource}.json`).then(function (response) {
                if (response && response.data) {
                    sessionStorage.setItem(dataSource, JSON.stringify(response.data));
                    deferred.resolve(response.data);
                }
            }, function (error) {
                console.log(error);
                deferred.reject(error);
            })
        }
        else {
            result = JSON.parse(sessionStorage.getItem(dataSource));
            deferred.resolve(result);
        }
        return deferred.promise;
    }

    //add new item to the list
    this.addNew=function(dataSource,data){
        if(typeof data != 'object'){
            data=JSON.parse(data);            
        }
        var deferred = $q.defer();
        if (!sessionStorage.getItem(dataSource)) {
            $http.get(`assets/jsons/${dataSource}.json`).then(function (response) {
                if (response && response.data) {
                    data.id=response.data.length + 1;
                    response.data.push(data);
                    sessionStorage.setItem(dataSource, JSON.stringify(response.data));
                    deferred.resolve(data);
                }
            }, function (error) {
                console.log(error);
                deferred.reject(error);
            })
        }
        else {
            storedData = JSON.parse(sessionStorage.getItem(dataSource));
            data.id=storedData.length + 1;
            storedData.push(data);
            sessionStorage.setItem(dataSource, JSON.stringify(storedData));
            deferred.resolve(data);
        }
        return deferred.promise;
    }

    //get data from the list based on particular property
    this.getDataById=function(dataSource,property,value){
        var deferred = $q.defer();
        var data;
        if (!sessionStorage.getItem(dataSource)) {
            $http.get(`assets/jsons/${dataSource}.json`).then(function (response) {
                if (response && response.data) {
                    sessionStorage.setItem(dataSource, JSON.stringify(response.data));
                    data=response.data.find(function(each){
                        return each[property]==value;
                    })
                    deferred.resolve(data);
                }
            }, function (error) {
                console.log(error);
                deferred.reject(error);
            })
        }
        else {
            storedData = JSON.parse(sessionStorage.getItem(dataSource));
            data=storedData.find(function(each){
                return each[property]==value;
            })
            deferred.resolve(data);
        }
        return deferred.promise;
    }

    //upadate object data in the array based in particular property
    this.updateStoredData=function(dataSource,property,value){
        var deferred = $q.defer();
        var index;
        if (!sessionStorage.getItem(dataSource)) {
            $http.get(`assets/jsons/${dataSource}.json`).then(function (response) {
                if (response && response.data) {
                   
                    index=response.data.findIndex(function(each){
                        return each[property]==value[property];
                    })
                    response.data[index]=value;
                    sessionStorage.setItem(dataSource, JSON.stringify(response.data));
                    deferred.resolve(response.data);
                }
            }, function (error) {
                console.log(error);
                deferred.reject(error);
            })
        }
        else {
            storedData = JSON.parse(sessionStorage.getItem(dataSource));
            index=storedData.findIndex(function(each){
                return each[property]==value[property];
            })
            storedData[index]=value;
            sessionStorage.setItem(dataSource, JSON.stringify(storedData));
            deferred.resolve(storedData);
        }
        return deferred.promise;
    }
})