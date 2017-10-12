function modalWindow(options) {

    this.elModal = null;
    this.elMask = null;
    this.elWindow = null;
    this.elHeader = null;
    this.elContent = null;
    this.elBtnClose = null;
    this.elPreloader = null;
    this.timeoutVar = null;
    this.parentContent = null;
    this.setting = {
        defaultWidth: 400,
        defaultHeight: 600,
        title: "",
        content: ".content-box",
        speed: 700,
        minMargin: 10
    };
    $.extend(this.setting, options);


    this.createModal = function () {
        this.elModal = $("<div/>").addClass("modal");
        this.elMask = $("<div/>").addClass("mask-modal").addClass("hide");
        this.elPreloader = $("<div/>").addClass("preloader-modal").addClass("hide");
        this.elWindow = $("<div/>").addClass("window-modal").addClass("hide");
        this.elHeader = $("<div/>").addClass("header-modal").text(this.setting.title);
        this.elContent = $("<div/>").addClass("content-modal");
        this.elBtnClose = $("<button/>").addClass("btn-close-modal");


        this.elWindow.append(this.elHeader);
        this.elWindow.append(this.elContent);
        this.elWindow.append(this.elBtnClose);
        this.elModal.append(this.elMask);
        this.elModal.append(this.elWindow);
        this.elModal.append(this.elPreloader);

        this.elMask = this.elModal.find(".mask-modal");
        this.elPreloader = this.elModal.find(".preloader-modal");
        this.elWindow = this.elModal.find(".window-modal");
        this.elHeader = this.elModal.find(".header-modal");
        this.elContent = this.elModal.find(".content-modal");
        this.elBtnClose = this.elModal.find(".btn-close-modal");

        this.elMask.bind("click", {obj: this}, function (e) {
            e.data.obj.close();
        });
        this.elBtnClose.bind("click", {obj: this}, function (e) {
            e.data.obj.close();
        });
        $(window).bind("resize", {obj: this}, function (e) {
            var self = e.data.obj;
            window.setTimeout(function () {
                self.setPosition();
            }, 500);

        });
    };

    this.show = function () {
        this.createModal();
        this.elModal.appendTo("body");
        this.showMask();
        this.startPreloader();
        this.loadContent(this.setting.content);
    };

    this.close = function () {

        this.hideWindow();
        this.hideMask();
        var self = this;
        this.timeoutVar = window.setTimeout(function () {
            if(self.parentContent !== null){
                self.parentContent.append(self.elContent);
            }
            self.elModal.remove();
        }, this.setting.speed);

        //this.elContent.html("");
        //this.elModal.remove();
    };


    this.startPreloader = function () {
        console.log("start function startPreloader");
        var self = this;
        this.timeoutVar = window.setTimeout(function () {
            self.showPreloader();
        }, 400);

    };
    this.showPreloader = function () {
        console.log("start function showPreloader");
        this.elPreloader.removeClass("hide");

    };
    this.hidePreloader = function () {
        console.log("start function hidePreloader");
        window.clearTimeout(this.timeoutVar);
        this.elPreloader.addClass("hide");
    };

    this.loadContent = function (name, variant) {
        var method = variant || "element";
        if (method === "element") {
            var content = $(document).find(name);
            this.parentContent = content.parent();
            this.elContent.html("").append(content);
            this.hidePreloader();
            this.showWindow();
            this.setPosition();
        }

        if (method === "url") {
            this.hidePreloader();
        }

        /*

                this.elContent.find("input").bind("focus", function(){
                   $(this).addClass("input--filled");
                });
                this.elContent.find("input").bind("blur", function(){
                    if($(this.val().trim() === '')){
                        $(this).removeClass("input--filled");
                    }
                });

        */

        [].slice.call(document.querySelectorAll('input.input__field')).forEach(function (inputEl) {
            // in case the input is already filled..
            if (inputEl.value.trim() !== '') {
                classie.add(inputEl.parentNode, 'input--filled');
            }

            // events:
            inputEl.addEventListener('focus', onInputFocus);
            inputEl.addEventListener('blur', onInputBlur);
        });


        return true;
    };

    this.showWindow = function () {
        var self = this;
        this.timeoutVar = window.setTimeout(function () {
            self.elWindow.removeClass("hide");
        }, 1);
        return true;
    };

    this.hideWindow = function () {
        this.elWindow.addClass("hide");
        ;
    };

    this.showMask = function () {
        var self = this;
        this.timeoutVar = window.setTimeout(function () {
            self.elMask.removeClass("hide");
        }, 1);
        return true;
    };

    this.hideMask = function () {
        this.elMask.addClass("hide");
    };

    this.setPosition = function () {
        console.log("start function setPosition");
        this.elContent.css({height: 'auto', overflowY: "none"});
        var widthWin = $(window).width();
        var heightWin = $(window).height();
        var widthModal = this.elWindow.width();
        var heightModal = this.elWindow.height();
        //var topPosition = -1 * (heightWin - heightModal) / 2;
        //var leftPosition = -1 * (widthWin - widthModal) / 2;

        var topPosition = (heightWin - heightModal) / 2;
        var leftPosition = (widthWin - widthModal) / 2;

        console.log("widthWin = " + widthWin);
        console.log("heightWin = " + heightWin);
        console.log("widthModal = " + widthModal);
        console.log("heightModal = " + heightModal);
        console.log("topPosition = " + topPosition);
        console.log("leftPosition = " + leftPosition);

        if (heightModal >= heightWin - 2 * this.setting.minMargin) {
            topPosition = this.setting.minMargin;

            var heightHeader = this.elHeader.height();
            var heightContent = heightWin - heightHeader - 2 * this.setting.minMargin;
            this.elContent.css({height: heightContent, overflowY: "scroll"});

            console.log("heightHeader = " + heightHeader);
            console.log("heightContent = " + heightContent);
        }

        console.log("topPosition = " + topPosition);
        console.log("leftPosition = " + leftPosition);
        this.elWindow.css({top: topPosition, left: leftPosition, margin: 0});

    };

    function onInputFocus(ev) {
        console.log("onInputFocus " + ev.target.value);
        classie.add(ev.target.parentNode, 'input--filled');
    }

    function onInputBlur(ev) {
        console.log("onInputBlur " + ev.target.value);
        if (ev.target.value.trim() === '') {
            classie.remove(ev.target.parentNode, 'input--filled');
        }
    }

}


