
var Url = 'http://localhost:3000/query';
var params = {
    type   : '',
    postid : ''
}

var state   = $('.result .state'),
    uList   = $('.result-box .list'),
    loading = $('.loading'),
    form    = $('.form');

var page = {

    init: function(){
        this.bindEvt();
    },
    bindEvt: function(){
        // 查询按钮
        form.on('click', '#submit', function(){
            model.loadData();            
        })

        // 订单号输入框，enter回车
        form.on('keyup', '#postid', function(e){
            if( e.keyCode == 13 ){
                model.loadData();
            }
        })
    
    }
}

var model = {

    loadData: function(){

        var type = $('#type').val();
        var postid = $.trim( $('#postid').val() );

        if( postid == '' ){
            state.text('无');
            uList.hide();
            alert('订单号不能为空，请输入！')
            return ;
        } 

        params.type = type;
        params.postid = postid;

        this.request();
    },
    // 获取订单数据--get
    request: function(){
        var _this = this;

        $.ajax({
            url        : Url,
            type       : 'GET',
            data       : params,
            beforeSend : function(){
                uList.hide();
                loading.show();
            },
            success    : function(res){
                var res = JSON.parse(res);
                _this.renderHtml(res);
            },
        })
    },
    // 数据渲染
    renderHtml: function(res){
        
        if( res.message == 'ok' ){
            state.text('ok');
        } else{
            loading.hide();
            state.text('单号不存在或已过期!');
            return ;
        }

        var data = res.data;

        if( data != null && data.length != 0 ){
            var html = '';
            uList.html('');
            for( var i = 0; i < data.length; i++ ){
                html += `
                <li>
                    <span>${data[i].time}</span>
                    <p>${data[i].context}</p>
                </li>
                `
            }

            uList.html(html);
            loading.hide();
            uList.show();
        }
    }
}

$(function(){
    page.init();
})