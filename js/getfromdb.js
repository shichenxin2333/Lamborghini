$.fn.extend({
    displayPart:function (width) {
        var displayLength = width;
        displayLength = this.attr("displayLength") || displayLength;
        var text = this.text();
        if (!text) return "";

        var result = "";
        var count = 0;
        for (var i = 0; i < displayLength; i++) {
            var _char = text.charAt(i);
            if (count >= displayLength) break;
            if (/[^x00-xff]/.test(_char)) count++; //双字节字符，//[u4e00-u9fa5]中文

            result += _char;
            count++;
        }
        if (result.length < text.length) {
            result += "";
        }
        this.text(result);
    }
});
var titles = []
function getdata(news_id){
    console.log(news_id);
    $.ajax({
        type:'get',
        url:"http://localhost:3000/newslist",
        success:true,
        dataType:"json",
        data:{
            news_id:news_id
        },
        success:function(result){
            var json= eval(result);
            $.each(json,function (idx, obj){
                console.log(idx)
                if (idx == 'newsTitle') {
                    console.log('g3');
                    $(".newsTitle"+news_id).text(obj);
                }
                if (idx == 'newsAuthor') {
                    $(".newsAuthor"+news_id).text(obj);
                }
                if (idx == 'newsBadges') {
                   $("#badge").before("<span class=\"badge badge-pill light-blue\">"+obj+"</span>")
                   $(".newsTime"+news_id).after("<br><span class=\"badge badge-pill light-blue\">"+obj+"</span>")
                }
                if (idx == 'newsContent') {
                    $(".newsContent"+news_id).text(obj);
                }
                if (idx == 'newsTime') {
                    $(".newsTime"+news_id).text(obj);
                    $(".newsTime"+news_id).displayPart(12);
                }
            })
        },
        error:function(error){
            console.log('error')
        }
    })
}
for(var i = 0;i < 4;i++){
    getdata(i);
}
