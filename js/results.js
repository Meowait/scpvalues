$(document).ready(() => {

    let econ_arr = ["公开", "公开", "偏向公开", "中立", "偏向隐藏", "隐藏", "隐藏"]
    let govt_arr = ["自由放任", "自由放任", "偏向自由", "中立", "偏向管控", "管控", "极端管控"]
    let scty_arr = ["科学至上", "科学", "偏向科学", "中立", "偏向神秘", "神秘", "神秘主义"]
    let envo_arr = ["圣母", "和平主义", "友善", "中立", "好战", "敌视一切", "大西王"]

    initialize();

    $('.fixed-action-btn').floatingActionButton();
    $('.tooltipped').tooltip();
    $('.modal').modal();

    function get_label(val, ary) {
        if (val > 100) {
            return ""
        } else if (val > 90) {
            return ary[0]
        } else if (val > 75) {
            return ary[1]
        } else if (val > 60) {
            return ary[2]
        } else if (val >= 40) {
            return ary[3]
        } else if (val >= 25) {
            return ary[4]
        } else if (val >= 10) {
            return ary[5]
        } else if (val >= 0) {
            return ary[6]
        } else {
            return ""
        }
    }

    function get_value(value_name) {
        let query;
        if (window.location.search) {
            query = window.location.search.substring(1);
        } else {
            query = window.location.hash.substring(1);
        }
        return (new URLSearchParams(query)).get(value_name);
    }

    function set_bar_and_percent(left_name, right_name, value) {
        $("#bar-" + left_name).css({"width": value + "%"})
        $("#percent-" + left_name).html(value + "%")
        $("#percent-" + right_name).html((100 - value) + "%")
    }

    function initialize() {
        let equality = get_value("econ")
        let liberty = get_value("govt")
        let progress = get_value("scty")
        let ecology = get_value("envo")

        set_bar_and_percent("equality", "market", equality)
        set_bar_and_percent("liberty", "authority", liberty)
        set_bar_and_percent("progress", "tradition", progress)
        set_bar_and_percent("ecology", "production", ecology)

        let special_desc = ""
        specials.forEach((item) => {
            let value = get_value(item.id)
            if (!isNaN(value)) {
                if (value >= 66) {
                    // todo 特性的描述完成之后取消注释下一行即可
                    special_desc += "<strong>" + item.name + "</strong>：" + item.desc + "<br>"
                    $("#" + item.id + "-show").removeClass("hide")
                    if (value < 83) {
                        $("#" + item.id + "-show img").css({"opacity": "50%"})
                    }
                }
            }
        })
        $("#special-desc").html(special_desc)

        $("#label-econ").html(get_label(equality, econ_arr))
        $("#label-govt").html(get_label(liberty, govt_arr))
        $("#label-scty").html(get_label(progress, scty_arr))
        $("#label-envo").html(get_label(ecology, envo_arr))

        let min_dist = Infinity
        let min_index = 0
        for (let i = 0; i < ideologies.length; i++) {
            let dist = 0
            dist += Math.pow(Math.abs(ideologies[i].stats.econ - equality), 2)
            dist += Math.pow(Math.abs(ideologies[i].stats.govt - liberty), 2)
            dist += Math.pow(Math.abs(ideologies[i].stats.scty - progress), 1.73856063)
            if (dist < min_dist) {
                min_index = i
                min_dist = dist
            }
        }
        if (!isNaN(equality) && !isNaN(liberty) && !isNaN(progress)) {
            $("#ideology-label").html(ideologies[min_index].name)
            $("#ideology-label2").html(ideologies[min_index].name)
            $("#ideology-desc").html(ideologies[min_index].desc)
            $("#ideology-link").attr("href", ideologies[min_index].link).html(ideologies[min_index].link)
        }
    }

    function show_image() {
        var imageBuilder = new ImageBuilder(); // 实例化图片构造器
        imageBuilder.line.width = 1000; // 设置每行宽度
        imageBuilder.line.height = 300; // 设置每行高度
        imageBuilder.barDistance = 25; // 设置Bar到图标的距离
        imageBuilder.bar.height = 50; // 设置Bar的高度
        // 填充图像数据
        imageBuilder.imgs = [
            [
                $("#img-equality")[0],
                $("#img-wealth")[0],
            ],
            [
                $("#img-liberty")[0],
                $("#img-authority")[0],
            ],
            [
                $("#img-progress")[0],
                $("#img-tradition")[0],
            ],
            [
                $("#img-ecology")[0],
                $("#img-production")[0],
            ],
        ];
        // 填充Bar颜色数据
        imageBuilder.colors = [
            ["#f44336", "#007bff"],
            ["#ff9800", "#03a9f4"],
            ["#ffeb3b", "#3f51b5"],
            ["#8bc34a", "#9c27b0"],
        ];
        // 填充政治坐标轴倾向数据
        imageBuilder.texts = [
            "帷幕: " + $("#economic-label").html(),
            "秩序: " + $("#state-label").html(),
            "解释: " + $("#society-label").html(),
            "态度: " + $("#environment-label").html(),
        ];
        // 填充Bar百分比数据
        imageBuilder.barData = [
            [equality, wealth],
            [liberty, authority],
            [progress, tradition],
            [ecology, production]
        ];
        imageBuilder.ideology = ideology; // 设置意识形态数据
        imageBuilder.version = Version;
        imageBuilder.getImg(); // 绘制图片
        // 展示图片
        $("#shows")[0].src = imageBuilder.canvas.toDataURL(
            "image/png"
        );

    }

})


/* function createImage(src, x, y, w, h) {
    img = new Image()
    img.src = src
    img.onLoad = function () {
        ctx.drawImage(img, x, y, w, h)
    }
}

 window.onload = function () {
    var c = document.createElement("canvas")
    var ctx = c.getContext("2d")
    c.width = 800;
    c.height = 650;
    ctx.fillStyle = "#EEEEEE"
    ctx.fillRect(0, 0, 800, 650);

    img = document.getElementById("img-equality")
    ctx.drawImage(img, 20, 170, 100, 100);
    img = document.getElementById("img-wealth")
    ctx.drawImage(img, 680, 170, 100, 100)
    img = document.getElementById("img-might")
    ctx.drawImage(img, 20, 290, 100, 100)
    img = document.getElementById("img-peace")
    ctx.drawImage(img, 680, 290, 100, 100)
    img = document.getElementById("img-liberty")
    ctx.drawImage(img, 20, 410, 100, 100)
    img = document.getElementById("img-authority")
    ctx.drawImage(img, 680, 410, 100, 100)
    img = document.getElementById("img-tradition")
    ctx.drawImage(img, 20, 530, 100, 100)
    img = document.getElementById("img-progress")
    ctx.drawImage(img, 680, 530, 100, 100)

    ctx.fillStyle = "#222222"
    ctx.fillRect(120, 180, 560, 80)
    ctx.fillRect(120, 300, 560, 80)
    ctx.fillRect(120, 420, 560, 80)
    ctx.fillRect(120, 540, 560, 80)
    ctx.fillStyle = "#f44336"
    ctx.fillRect(120, 184, 5.6 * equality - 2, 72)
    ctx.fillStyle = "#00897b"
    ctx.fillRect(682 - 5.6 * wealth, 184, 5.6 * wealth - 2, 72)
    ctx.fillStyle = "#ff9800"
    ctx.fillRect(120, 304, 5.6 * might - 2, 72)
    ctx.fillStyle = "#03a9f4"
    ctx.fillRect(682 - 5.6 * peace, 304, 5.6 * peace - 2, 72)
    ctx.fillStyle = "#ffeb3b"
    ctx.fillRect(120, 424, 5.6 * liberty - 2, 72)
    ctx.fillStyle = "#3f51b5"
    ctx.fillRect(682 - 5.6 * authority, 424, 5.6 * authority - 2, 72)
    ctx.fillStyle = "#8bc34a"
    ctx.fillRect(120, 544, 5.6 * tradition - 2, 72)
    ctx.fillStyle = "#9c27b0"
    ctx.fillRect(682 - 5.6 * progress, 544, 5.6 * progress - 2, 72)
    ctx.fillStyle = "#222222"
    ctx.font = "700 80px Montserrat"
    ctx.textAlign = "left"
    ctx.fillText("8values", 20, 90)
    ctx.font = "50px Montserrat"
    ctx.fillText(ideology, 20, 140)

    ctx.textAlign = "left"
    if (equality > 30) { ctx.fillText(equality + "%", 130, 237.5) }
    if (might > 30) { ctx.fillText(might + "%", 130, 357.5) }
    if (liberty > 30) { ctx.fillText(liberty + "%", 130, 477.5) }
    if (tradition > 30) { ctx.fillText(tradition + "%", 130, 597.5) }
    ctx.textAlign = "right"
    if (wealth > 30) { ctx.fillText(wealth + "%", 670, 237.5) }
    if (peace > 30) { ctx.fillText(peace + "%", 670, 357.5) }
    if (authority > 30) { ctx.fillText(authority + "%", 670, 477.5) }
    if (progress > 30) { ctx.fillText(progress + "%", 670, 597.5) }

    ctx.font = "300 30px Montserrat"
    ctx.fillText("8values.github.io", 780, 60)
    ctx.fillText(version, 780, 90)
    ctx.textAlign = "center"
    ctx.fillText("Economic Axis: " + document.getElementById("economic-label").innerHTML, 400, 175)
    ctx.fillText("Diplomatic Axis: " + document.getElementById("diplomatic-label").innerHTML, 400, 295)
    ctx.fillText("Civil Axis: " + document.getElementById("state-label").innerHTML, 400, 415)
    ctx.fillText("Societal Axis: " + document.getElementById("society-label").innerHTML, 400, 535)

    document.getElementById("banner").src = c.toDataURL(); 
} */
