/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        document.getElementById("pushPoleId")
            .addEventListener("click", getId, false);

        document.getElementById("isPushPoleInitialized")
            .addEventListener("click", isPushPoleInitialized, false);

        document.getElementById("createNotifChannel")
            .addEventListener("click", createNotifChannel, false);

        document.getElementById("deleteNotifChannel")
            .addEventListener("click", deleteNotifChannel, false);

        document.getElementById("subscribe")
            .addEventListener("click", subscribe, false);

        document.getElementById("unsubscribe")
            .addEventListener("click", unsubscribe, false);

        document.getElementById("showNotif")
            .addEventListener("click", showNotif, false);

        document.getElementById("hideNotif")
            .addEventListener("click", hideNotif, false);

        document.getElementById("sendSimpleNotif")
            .addEventListener("click", sendSimpleNotif, false);

        document.getElementById("sendAdvancedNotif")
            .addEventListener("click", sendAdvancedNotif, false);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
	window.pushe.initialize();
    
        console.log('Received Event: ' + id);
    }
};

app.initialize();

function alertDismissed() {
    // do something
}

function getId()
{
    window.pushe.getId(function pidCallnack(pid){
        console.log("PushPoleID is: " + pid);
        navigator.notification.alert("PushPole Id is: "+pid, alertDismissed)
    });
}

function isPushPoleInitialized()
{
    window.pushe.isPushPoleInitialized(function pusheInited(result){
        var status = result?"پوش‌پل راه اندازی شده است":"پوش‌پل راه اندازی نشده است"
        navigator.notification.alert(status, alertDismissed)
    });
}

function createNotifChannel()
{
    navigator.notification.alert("ایجاد کانال اخبار", alertDismissed)

    window.pushe.createNotificationChannel(
        "1234", //channelId
        "کانال اخبار", //Channel Name
        "کانالی برای دریافت اخبار", //description about channel
        4, //importance: Number between 0 to 5 (5 is the most important)
        true, //enableLight
        true, //enableViberation
        true, //showBadge
        -16776961//led color
    );

}

function deleteNotifChannel()
{
    navigator.notification.alert("حذف کانال اخبار", alertDismissed)

    window.pushe.removeNotificationChannel("1234" //channelId
    );
}

function subscribe()
{
    navigator.notification.alert("عضویت در تاپیک ورزشی", alertDismissed);

    window.pushe.isPushPoleInitialized(function pusheInited(result){
        if(result) {
             window.pushe.suscribe("sport");
         }
    });

}

function unsubscribe()
{
    navigator.notification.alert("لغو عضویت از تاپیک ورزشی", alertDismissed);

    window.pushe.isPushPoleInitialized(function pusheInited(result){
        if(result) {
             window.pushe.unsubscribe("sport");
         }
    });

}

function showNotif()
{
    navigator.notification.alert("فعال کردن نمایش نوتیفیکیشن", alertDismissed);

    window.pushe.setNotificationOn();
}

function hideNotif()
{
    navigator.notification.alert("غیر فعال کردن نمایش نوتیفیکیشن", alertDismissed);

    window.pushe.setNotificationOff();
}

/** 
* باید پوش‌پل آی‌دی دیوایسی که میخواهید به آن اعلان بفرستید را داشته باشید
* در اینجا با گرفتن پوش‌پل آی‌دی‌ همین دیوایسی که اپ روی آن اجرا میشود به آن اعلان فرستاده‌ایم
* دقت کنید که در ابتدا چک کرده‌ایم که پوش‌پل راه‌اندازی شده است یا نه  
* */
function sendSimpleNotif()
{
    window.pushe.isPushPoleInitialized(function pusheInited(result){
        if(result) {
            window.pushe.getId(function pidCallnack(pid){
                window.pushe.sendSimpleNotifToUser(pid, "عنوان تست", "محتوای تست");
            });
        }
  });
  navigator.notification.alert("ارسال نوتیفیکیشن ساده به این دیوایس انجام شد، نمایش آن ممکن است کمی طول بکشد", alertDismissed);

}

/** 
* باید پوش‌پل آی‌دی دیوایسی که میخواهید به آن اعلان بفرستید را داشته باشید
* در اینجا با گرفتن پوش‌پل آی‌دی‌ همین دیوایسی که اپ روی آن اجرا میشود به آن اعلان فرستاده‌ایم
* دقت کنید که در ابتدا چک کرده‌ایم که پوش‌پل راه‌اندازی شده است یا نه  
* */
function sendAdvancedNotif()
{
    window.pushe.isPushPoleInitialized(function pusheInited(result){
        if(result) {
            window.pushe.getId(function pidCallnack(pid){
                window.pushe.sendAdvancedNotifToUser(pid, "{\"title\": \"عنوان\",\"content\": \"تیتر\", \"big_content\": \"عنوان کامل\"}");
            });
        }
  });
  navigator.notification.alert("ارسال نوتیفیکیشن پیشرفته به این دیوایس انجام شد، نمایش آن ممکن است کمی طول بکشد", alertDismissed);

}