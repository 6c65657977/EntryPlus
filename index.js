window.addEventListener('load', function() {
    start = 0
    function ImageView(){
        if (document.location.host == 'playentry.org'){
            contents = document.querySelectorAll('div.css-sy8ihv.e1i41bku1')
            for (let i = start; i < contents.length; i++){
                start = 0
                for (let j = 0; j < contents[i].children.length; j++){
                    if (contents[i].children[j].outerHTML.replace('/𝕡layentry.org/', '/playentry.org/').indexOf('<a target="_blank" href="https://playentry.org/uploads/') == 0 && contents[i].children[j].outerHTML.indexOf('<img ') == -1){
                        if (contents[i].children[j].outerHTML.indexOf('/signout') >= 0){
                            contents[i].children[j].outerHTML = contents[i].children[j].outerHTML.replaceAll('signout', '')
                        }else{
                            document.querySelectorAll('div.css-sy8ihv.e1i41bku1')[i].children[j].innerHTML = '<br><img width=300px; height=auto; src=' + document.querySelectorAll('div.css-sy8ihv.e1i41bku1')[i].children[j].innerHTML +'> </img></br>'
                        }
                    }
                }
                if (document.querySelectorAll('div.css-sy8ihv.e1i41bku1')[i].outerHTML.replaceAll('&lt;br /&gt;', '\n').indexOf('\n') >= 0){
                    document.querySelectorAll('div.css-sy8ihv.e1i41bku1')[i].outerHTML = document.querySelectorAll('div.css-sy8ihv.e1i41bku1')[i].outerHTML.replaceAll('&lt;br /&gt;', '\n').replace('\n', '<br>').replaceAll('\n', '<br>').replaceAll('</div>', '</br></div>')
                }
            }
        }
    }
    setInterval(function() {
        if (document.location.host == 'playentry.org' && document.location.pathname.indexOf('/qna/') == -1 && (document.location.pathname.indexOf('/community/') != -1 || document.location.pathname.indexOf('/project/') == 0)){
            blank = document.createElement('text')
            blank.innerText = '　'
            upload = document.createElement('img')
            upload_com = document.createElement('img')
            upload_ = document.createElement('img')
            upload_.src = 'https://playentry.org/img/IcoCmtPicture.svg'
            upload_com.src = 'https://playentry.org/img/IcoCmtPicture.svg'
            upload.src = 'https://playentry.org/img/IcoCmtPicture.svg'
            if (document.querySelectorAll('div.css-109f9np.e1h77j9v7').length > 0){
                if (document.querySelectorAll('div.css-109f9np.e1h77j9v7')[0].childElementCount <= 2){
                    document.querySelectorAll('div.css-109f9np.e1h77j9v7')[0].appendChild(blank)
                    if (location.pathname.indexOf('/entrystory') >= 0) {
                        document.querySelectorAll('div.css-109f9np.e1h77j9v7')[0].appendChild(upload)
                    }else {
                        document.querySelectorAll('div.css-109f9np.e1h77j9v7')[0].appendChild(upload_)
                    }
                }
                for (let i = 1; i < document.querySelectorAll('div.css-109f9np.e1h77j9v7').length; i++) {
                    if (document.querySelectorAll('div.css-109f9np.e1h77j9v7')[i].children.length <= 1){
                        document.querySelectorAll('div.css-109f9np.e1h77j9v7')[i].appendChild(blank)
                        document.querySelectorAll('div.css-109f9np.e1h77j9v7')[i].appendChild(upload_com)
                    }
                }
            }
            upload.addEventListener('click', function(e){
                (async function(){
                    var getIdeal = function(){
                        var next_data = document.getElementById("__NEXT_DATA__");
                        var nj = JSON.parse(next_data.innerText);
                        return {csrf: nj.props.initialProps.csrfToken, xtoken: nj.props.initialState.common.user.xToken};
                    };
                
                    var imgFileCompress = function(file){
                        return new Promise(function(res, rej){
                            var image = new Image();
                            image.onload = function(event) {
                                const maxN = 2400;
                                const width = image.width, height = image.height;
                                const scaleRatio = width > height ? maxN / width : maxN / height;
                                var canvas = document.createElement("canvas");
                                canvas.width = width * scaleRatio; canvas.height = height * scaleRatio;
                                var ctx = canvas.getContext("2d");
                                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                                var dataURI = canvas.toDataURL("image/png");
                                const splitDataURI = dataURI.split(',');
                                const byteString = window.atob(splitDataURI[1]);
                
                                const ia = new Uint8Array(byteString.length);
                                for (let i = 0; i < byteString.length; i++){
                                    ia[i] = byteString.charCodeAt(i);
                                }
                                res(new Blob([ia], { type: "image/png" }));
                            };
                            image.src = globalThis.URL.createObjectURL(file);
                        });
                    };
                
                    var load = function(){
                        return new Promise(function(res, rej){
                            let input = document.createElement("input");
                            input.type = "file";
                            input.onchange = ()=>{
                                const file = input.files[0];
                                const fileSizeKB = file.size >> 10;
                                if (fileSizeKB >= 1024) {
                                    if(alert(""), false){
                                        imgFileCompress(file).then(function(blob){
                                            let fd = new FormData();
                                            fd.append("file", blob);
                                            fd.append("type", "notcompress");
                                            fetch("https://playentry.org/rest/picture", { method : "POST",body : fd}).then(r=>r.json()).then(j=>{
                                                res(j);
                                                input.remove();
                                            });
                                        });
                                        return;
                                    } else {
                                        rej();
                                    }
                                }
                
                                let fd = new FormData();
                                fd.append("file", input.files[0]);
                                fd.append("type", "notcompress");
                                fetch("https://playentry.org/rest/picture", { method : "POST", body : fd}).then(r=>r.json()).then(j=>{
                                    res(j);
                                    input.remove();
                                });
                            }
                            document.body.append(input);
                            input.style.display = "none";
                            var h2 = document.querySelector("h2"), n;
                            if(h2){
                                n = h2.innerText;
                            }
                            var f = function(){
                                if(h2){
                                    h2.innerText = n;
                                    h2.style.textDecoration = "";
                                }
                                input.click();
                                document.body.removeEventListener("click", f);
                            };
                            f()
                        });
                    };
                    var wait = function(t){
                        return new Promise(function(s, j){
                            setTimeout(function(){s();}, t);
                        });
                    };
                    var cont = document.getElementsByName('Write')[0].value
                    var wrt = document.getElementById("Write");
                    if(wrt) {wrt.value = cont;}
                    await wait(100);
                    var id = "";
                    try {
                        id_ = await load();
                        id = id_._id
                        filename = id_.filename
                        filetype = '.' + id_.imageType.replace('jpg', 'jpeg')
                    } catch {
                        return;
                    }
                    var idl = getIdeal();
                    var csrf = idl.csrf, xtoken = idl.xtoken;
                    if (document.location.href.indexOf("entrystory") >= 0) {
                        if (confirm("이모티콘 형식으로 업로드하시겠습니까? 취소시 사진으로 업로드")) {
                            await fetch("https://playentry.org/graphql", {
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "x-client-type": "Client",
                                        "CSRF-Token": csrf,
                                        "x-token": xtoken
                                    },
                                    "body": JSON.stringify({
                                        "query":"\n    query CURRENT_USER_EMAIL_AUTH {\n        me {\n            role\n            isEmailAuth\n        }\n    }\n"
                                }),
                                "method": "POST"
                            });
                            var crt = await (async function(cont, id){
                                Id = (await (await fetch("https://playentry.org/graphql", {
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "x-client-type": "Client",
                                        "CSRF-Token": csrf,
                                        "x-token": xtoken
                                    },
                                    "body": JSON.stringify({
                                                    "query":"\n    mutation CREATE_ENTRYSTORY(\n        \n    $content: String\n    $text: String\n    $image: String\n    $sticker: ID\n    $stickerItem: ID\n    $cursor: String\n\n    ) {\n        createEntryStory(\n            \n    content: $content\n    text: $text\n    image: $image\n    sticker: $sticker\n    stickerItem: $stickerItem\n    cursor: $cursor\n\n        ) {\n            warning\n            discuss{\n                \n    id\n    title\n    content\n    seContent\n    created\n    commentsLength\n    likesLength\n    visit\n    category\n    prefix\n    groupNotice\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n    mark {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n \n    }\n\n    }\n    images {\n        filename\n        imageUrl\n    }\n    sticker {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    progress\n    thumbnail\n    reply\n    bestComment {\n        \n    id\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n    mark {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n \n    }\n\n    }\n    content\n    created\n    removed\n    blamed\n    blamedBy\n    commentsLength\n    likesLength\n    isLike\n    hide\n    image {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    sticker {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n\n    }\n    blamed\n    description1\n    description2\n    description3\n\n            }\n        }\n    }\n",
                                    "variables": {
                                        "content": cont
                                    }
                                }),
                                "method": "POST"
                            })).json()).data.createEntryStory.discuss.id;
                            var crt = await fetch("https://playentry.org/graphql", {
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "x-client-type": "Client",
                                        "CSRF-Token": csrf,
                                        "x-token": xtoken
                                    },
                                    "body": JSON.stringify({
                                                    "query":"\n    mutation REPAIR_ENTRYSTORY(\n        $id: ID, \n        $content: String, \n        $image: String, \n        $sticker: ID\n        $stickerItem: ID\n    ){\n        repairEntryStory(\n            id: $id, \n            content: $content, \n            image: $image, \n            sticker: $sticker\n            stickerItem: $stickerItem\n        ){\n            \n    id\n    title\n    content\n    seContent\n    created\n    commentsLength\n    likesLength\n    visit\n    category\n    prefix\n    groupNotice\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n    mark {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n \n    }\n\n    }\n    images {\n        filename\n        imageUrl\n    }\n    sticker {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    progress\n    thumbnail\n    reply\n    bestComment {\n        \n    id\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n    mark {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n \n    }\n\n    }\n    content\n    created\n    removed\n    blamed\n    blamedBy\n    commentsLength\n    likesLength\n    isLike\n    hide\n    image {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    sticker {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n\n    }\n    blamed\n    description1\n    description2\n    description3\n\n        }\n    }\n",
                                    "variables": {
                                        "id":Id,
                                        "content": cont,
                                        "sticker": null, 
                                        "stickerItem": id
                                    }
                                }),
                                "method": "POST"
                            })
                            return await crt.json();
                        })(cont, id);
                        setTimeout(()=> location.reload(), 500)
                            }else {
                                console.log(e.target.parentElement.parentElement.parentElement.children[1].firstChild.children[0].childNodes.length)
                                cont = e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[1].firstChild.children[0].textContent
                                if(e.target.parentElement.parentElement.parentElement.children[1].firstChild.children[0].childNodes.length > 0){
                                    e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[1].firstChild.firstChild.firstChild.remove()
                                }
                                e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[1].firstChild.children[0].append(new Text(cont + " https://playentry.org/uploads/"+filename.substring(0, 2)+"/"+filename.substring(2, 4)+"/"+filename+filetype))
                                e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[1].firstChild.children[0].data = cont + " https://playentry.org/uploads/"+filename.substring(0, 2)+"/"+filename.substring(2, 4)+"/"+filename+filetype
                                e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[1].firstChild.children[0].value = cont + " https://playentry.org/uploads/"+filename.substring(0, 2)+"/"+filename.substring(2, 4)+"/"+filename+filetype
                                e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[1].firstChild.children[0].style.height = String(e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[1].firstChild.children[0].scrollHeight)+'px'
                    }
                    }else if(document.location.href.includes("/group/community/")){
                        if (confirm("이모티콘 형식으로 업로드하시겠습니까? 취소시 사진으로 업로드")) {
                            var crt = await (async function(cont, id){
                                var crt = await fetch("https://playentry.org/graphql", {
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "x-client-type": "Client",
                                        "CSRF-Token": csrf,
                                        "x-token": xtoken
                                    },
                                    "body": JSON.stringify({
                                        "query":"\n    mutation CREATE_COMMENT(\n        \n    $content: String\n    $image: String\n    $sticker: ID\n    $stickerItem: ID\n    $target: String\n    $targetSubject: String\n    $targetType: String\n    $groupId: ID\n\n    ) {\n        createComment(\n            \n    content: $content\n    image: $image\n    sticker: $sticker\n    stickerItem: $stickerItem\n    target: $target\n    targetSubject: $targetSubject\n    targetType: $targetType\n    groupId: $groupId\n\n        ) {\n            warning\n            comment {\n                \n    id\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n\n    }\n    content\n    created\n    removed\n    blamed\n    commentsLength\n    likesLength\n    isLike\n    hide\n    image {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    sticker {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n\n            }\n        }\n    }\n",
                                        "variables": {
                                            "content": cont,
                                            "stickerItem": id,
                                            "groupId": document.location.href.split("?activeTab")[0].replace("https://", "").replace("community", "discuss").replace("tips/", "").replace("qna/", "").replace("notice/", "").split("/")[4],
                                            "target":document.location.href.split("?activeTab")[0].replace("https://", "").replace("community", "discuss").replace("tips/", "").replace("qna/", "").replace("notice/", "").split("/")[3],
                                            "targetSubject": "discuss",
                                            "targetType":"individual"
                                        }
                                    }),
                                    "method": "POST"
                                });
                                return await crt.json();
                            })(cont, id);
                            location.reload()
                        }else {
                            cont = e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].textContent
                            if(e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].childNodes.length > 0){
                                e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].remove(e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].childNodes[0])
                                e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].style.height = String(e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].scrollHeight)+'px'
                            }
                            e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].append(new Text(cont + " https://playentry.org/uploads/"+filename.substring(0, 2)+"/"+filename.substring(2, 4)+"/"+filename+filetype))
                            e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].value = e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].childNodes[0].data
                            e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].style.height = String(e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].scrollHeight)+'px'
                            
                        }
                    }else {
                        if (confirm("이모티콘 형식으로 업로드하시겠습니까? 취소시 사진으로 업로드")) {
                            var crt = await (async function(cont, id){
                                var crt = await fetch("https://playentry.org/graphql", {
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "x-client-type": "Client",
                                        "CSRF-Token": csrf,
                                        "x-token": xtoken
                                    },
                                    "body": JSON.stringify({
                                        "query":"\n    mutation CREATE_COMMENT(\n        \n    $content: String\n    $image: String\n    $sticker: ID\n    $stickerItem: ID\n    $target: String\n    $targetSubject: String\n    $targetType: String\n    $groupId: ID\n\n    ) {\n        createComment(\n            \n    content: $content\n    image: $image\n    sticker: $sticker\n    stickerItem: $stickerItem\n    target: $target\n    targetSubject: $targetSubject\n    targetType: $targetType\n    groupId: $groupId\n\n        ) {\n            warning\n            comment {\n                \n    id\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n\n    }\n    content\n    created\n    removed\n    blamed\n    commentsLength\n    likesLength\n    isLike\n    hide\n    image {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    sticker {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n\n            }\n        }\n    }\n",
                                        "variables": {
                                            "content": cont,
                                            "stickerItem": id,
                                            "target":document.location.href.replace("https://", "").replace("community", "discuss").replace("tips/", "").replace("qna/", "").replace("notice/", "").split("/")[2],
                                            "targetSubject":document.location.href.replace("https://", "").replace("community", "discuss").replace("tips/", "").replace("qna/", "").replace("notice/", "").split("/")[1],
                                            "targetType":"individual"
                                        }
                                    }),
                                    "method": "POST"
                                });
                                return await crt.json();
                            })(cont, id);
                            location.reload()
                        }else {
                            cont = e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].textContent
                            if(e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].childNodes.length > 0){
                                e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].remove(e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].childNodes[0])
                            }
                            e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].append(new Text(cont + " https://playentry.org/uploads/"+filename.substring(0, 2)+"/"+filename.substring(2, 4)+"/"+filename+filetype))
                            e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].value = e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].childNodes[0].data
                            e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].style.height = String(e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstChild.children[0].scrollHeight)+'px'
                        }
                    }
                })();
            })
            upload_.addEventListener('click', function(e){
                (async function(){
                    var getIdeal = function(){
                        var next_data = document.getElementById("__NEXT_DATA__");
                        var nj = JSON.parse(next_data.innerText);
                        return {csrf: nj.props.initialProps.csrfToken, xtoken: nj.props.initialState.common.user.xToken};
                    };
                
                    var imgFileCompress = function(file){
                        return new Promise(function(res, rej){
                            var image = new Image();
                            image.onload = function(event) {
                                const maxN = 2400;
                                const width = image.width, height = image.height;
                                const scaleRatio = width > height ? maxN / width : maxN / height;
                                var canvas = document.createElement("canvas");
                                canvas.width = width * scaleRatio; canvas.height = height * scaleRatio;
                                var ctx = canvas.getContext("2d");
                                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                                var dataURI = canvas.toDataURL("image/png");
                                const splitDataURI = dataURI.split(',');
                                const byteString = window.atob(splitDataURI[1]);
                
                                const ia = new Uint8Array(byteString.length);
                                for (let i = 0; i < byteString.length; i++){
                                    ia[i] = byteString.charCodeAt(i);
                                }
                                res(new Blob([ia], { type: "image/png" }));
                            };
                            image.src = globalThis.URL.createObjectURL(file);
                        });
                    };
                    var load = function(){
                        return new Promise(function(res, rej){
                            let input = document.createElement("input");
                            input.type = "file";
                            input.onchange = ()=>{
                                const file = input.files[0];
                                const fileSizeKB = file.size >> 10;
                                if (fileSizeKB >= 1024) {
                                    if(alert(""), false){
                                        imgFileCompress(file).then(function(blob){
                                            let fd = new FormData();
                                            fd.append("file", blob);
                                            fd.append("type", "notcompress");
                                            fetch("https://playentry.org/rest/picture", { method : "POST",body : fd}).then(r=>r.json()).then(j=>{
                                                res(j);
                                                input.remove();
                                            });
                                        });
                                        return;
                                    } else {
                                        rej();
                                    }
                                }
                                let fd = new FormData();
                                fd.append("file", input.files[0]);
                                fd.append("type", "notcompress");
                                fetch("https://playentry.org/rest/picture", { method : "POST", body : fd}).then(r=>r.json()).then(j=>{
                                    res(j);
                                    input.remove();
                                });
                            }
                            document.body.append(input);
                            input.style.display = "none";
                            var h2 = document.querySelector("h2"), n;
                            if(h2){
                                n = h2.innerText;
                            }
                            var f = function(){
                                if(h2){
                                    h2.innerText = n;
                                    h2.style.textDecoration = "";
                                }
                                input.click();
                                document.body.removeEventListener("click", f);
                            };
                            f()
                        });
                    };
                    var wait = function(t){
                        return new Promise(function(s, j){
                            setTimeout(function(){s();}, t);
                        });
                    };
                    var cont = document.getElementsByName('Write')[0].value
                    var wrt = document.getElementById("Write");
                    if(wrt) {wrt.value = cont;}
                    await wait(100);
                    var id = "";
                    try {
                        id_ = await load();
                        id = id_._id
                        filename = id_.filename
                        filetype = '.' + id_.imageType.replace('jpg', 'jpeg')
                    } catch {
                        return;
                    }
                    var idl = getIdeal();
                    var csrf = idl.csrf, xtoken = idl.xtoken;
                    if (document.location.href.indexOf("entrystory") >= 0) {
                        if (confirm("이모티콘 형식으로 업로드하시겠습니까? 취소시 사진으로 업로드")) {
                        var crt = await (async function(cont, id){
                            var crt = await fetch("https://playentry.org/graphql", {
                                "headers": {
                                    "Content-Type": "application/json",
                                    "x-client-type": "Client",
                                    "CSRF-Token": csrf,
                                    "x-token": xtoken
                                },
                                "body": JSON.stringify({
                                                "query":"\n    mutation CREATE_ENTRYSTORY(\n        \n    $content: String\n    $text: String\n    $image: String\n    $sticker: ID\n    $stickerItem: ID\n    $cursor: String\n\n    ) {\n        createEntryStory(\n            \n    content: $content\n    text: $text\n    image: $image\n    sticker: $sticker\n    stickerItem: $stickerItem\n    cursor: $cursor\n\n        ) {\n            warning\n            discuss{\n                \n    id\n    title\n    content\n    seContent\n    created\n    commentsLength\n    likesLength\n    visit\n    category\n    prefix\n    groupNotice\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n\n    }\n    images {\n        filename\n        imageUrl\n    }\n    sticker {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    progress\n    thumbnail\n    reply\n    bestComment {\n        \n    id\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n\n    }\n    content\n    created\n    removed\n    blamed\n    commentsLength\n    likesLength\n    isLike\n    hide\n    image {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    sticker {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n\n    }\n    blamed\n\n            }\n        }\n    }\n",
                                "variables": {
                                    "content": cont,
                                    "stickerItem": id
                                }
                            }),
                            "method": "POST"
                        });
                        return await crt.json();
                    })(cont, id);
                    location.reload()
                        }else {
                            print(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes.length)
                            cont = e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].textContent
                            if(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes.length > 0){
                                e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].remove(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes[0])
                            }
                            e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].append(new Text(cont + " https://playentry.org/uploads/"+filename.substring(0, 2)+"/"+filename.substring(2, 4)+"/"+filename+filetype))
                            e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].value = e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes[0].data
                            e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].style.height = String(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].scrollHeight)+'px'
                        }
                    }else if(document.location.href.includes("/group/community/")){
                        if (confirm("이모티콘 형식으로 업로드하시겠습니까? 취소시 사진으로 업로드")) {
                            var crt = await (async function(cont, id){
                                var crt = await fetch("https://playentry.org/graphql", {
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "x-client-type": "Client",
                                        "CSRF-Token": csrf,
                                        "x-token": xtoken
                                    },
                                    "body": JSON.stringify({
                                        "query":"\n    mutation CREATE_COMMENT(\n        \n    $content: String\n    $image: String\n    $sticker: ID\n    $stickerItem: ID\n    $target: String\n    $targetSubject: String\n    $targetType: String\n    $groupId: ID\n\n    ) {\n        createComment(\n            \n    content: $content\n    image: $image\n    sticker: $sticker\n    stickerItem: $stickerItem\n    target: $target\n    targetSubject: $targetSubject\n    targetType: $targetType\n    groupId: $groupId\n\n        ) {\n            warning\n            comment {\n                \n    id\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n\n    }\n    content\n    created\n    removed\n    blamed\n    commentsLength\n    likesLength\n    isLike\n    hide\n    image {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    sticker {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n\n            }\n        }\n    }\n",
                                        "variables": {
                                            "content": cont,
                                            "stickerItem": id,
                                            "groupId": document.location.href.split("?activeTab")[0].replace("https://", "").replace("community", "discuss").replace("tips/", "").replace("qna/", "").replace("notice/", "").split("/")[4],
                                            "target":document.location.href.split("?activeTab")[0].replace("https://", "").replace("community", "discuss").replace("tips/", "").replace("qna/", "").replace("notice/", "").split("/")[3],
                                            "targetSubject": "discuss",
                                            "targetType":"individual"
                                        }
                                    }),
                                    "method": "POST"
                                });
                                return await crt.json();
                            })(cont, id);
                            location.reload()
                        }else {
                            cont = e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].textContent
                            if(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes.length > 0){
                                e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].remove(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes[0])
                            }
                            e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].append(new Text(cont + " https://playentry.org/uploads/"+filename.substring(0, 2)+"/"+filename.substring(2, 4)+"/"+filename+filetype))
                            e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].value = e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes[0].data
                            e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].style.height = String(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].scrollHeight)+'px'
                        }
                    }else {
                        if (confirm("이모티콘 형식으로 업로드하시겠습니까? 취소시 사진으로 업로드")) {
                            var crt = await (async function(cont, id){
                                var crt = await fetch("https://playentry.org/graphql", {
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "x-client-type": "Client",
                                        "CSRF-Token": csrf,
                                        "x-token": xtoken
                                    },
                                    "body": JSON.stringify({
                                        "query":"\n    mutation CREATE_COMMENT(\n        \n    $content: String\n    $image: String\n    $sticker: ID\n    $stickerItem: ID\n    $target: String\n    $targetSubject: String\n    $targetType: String\n    $groupId: ID\n\n    ) {\n        createComment(\n            \n    content: $content\n    image: $image\n    sticker: $sticker\n    stickerItem: $stickerItem\n    target: $target\n    targetSubject: $targetSubject\n    targetType: $targetType\n    groupId: $groupId\n\n        ) {\n            warning\n            comment {\n                \n    id\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n\n    }\n    content\n    created\n    removed\n    blamed\n    commentsLength\n    likesLength\n    isLike\n    hide\n    image {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    sticker {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n\n            }\n        }\n    }\n",
                                        "variables": {
                                            "content": cont,
                                            "stickerItem": id,
                                            "target":document.location.href.replace("https://", "").replace("community", "discuss").replace("tips/", "").replace("qna/", "").replace("notice/", "").split("/")[2],
                                            "targetSubject":document.location.href.replace("https://", "").replace("community", "discuss").replace("tips/", "").replace("qna/", "").replace("notice/", "").split("/")[1],
                                            "targetType":"individual"
                                        }
                                    }),
                                    "method": "POST"
                                });
                                return await crt.json();
                            })(cont, id);
                            location.reload()
                        }else {
                            cont = e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].textContent
                            if(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes.length > 0){
                                e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].remove(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes[0])
                            }
                            e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].append(new Text(cont + " https://playentry.org/uploads/"+filename.substring(0, 2)+"/"+filename.substring(2, 4)+"/"+filename+filetype))
                            e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].value = e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes[0].data
                            e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].style.height = String(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].scrollHeight)+'px'
                        }
                    }
                })();
            })
            upload_com.addEventListener('click', function(e){
                (async function(){
                    var imgFileCompress = function(file){
                        return new Promise(function(res, rej){
                            var image = new Image();
                            image.onload = function(event) {
                                const maxN = 2400;
                                const width = image.width, height = image.height;
                                const scaleRatio = width > height ? maxN / width : maxN / height;
                                var canvas = document.createElement("canvas");
                                canvas.width = width * scaleRatio; canvas.height = height * scaleRatio;
                                var ctx = canvas.getContext("2d");
                                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                                var dataURI = canvas.toDataURL("image/png");
                                const splitDataURI = dataURI.split(',');
                                const byteString = window.atob(splitDataURI[1]);
                
                                const ia = new Uint8Array(byteString.length);
                                for (let i = 0; i < byteString.length; i++){
                                    ia[i] = byteString.charCodeAt(i);
                                }
                                res(new Blob([ia], { type: "image/png" }));
                            };
                            image.src = globalThis.URL.createObjectURL(file);
                        });
                    };
                    var load = function(){
                        return new Promise(function(res, rej){
                            let input = document.createElement("input");
                            input.type = "file";
                            input.onchange = ()=>{
                                const file = input.files[0];
                                const fileSizeKB = file.size >> 10;
                                if (fileSizeKB >= 1024) {
                                    if(alert(""), false){
                                        imgFileCompress(file).then(function(blob){
                                            let fd = new FormData();
                                            fd.append("file", blob);
                                            fd.append("type", "notcompress");
                                            fetch("https://playentry.org/rest/picture", { method : "POST",body : fd}).then(r=>r.json()).then(j=>{
                                                res(j);
                                                input.remove();
                                            });
                                        });
                                        return;
                                    } else {
                                        rej();
                                    }
                                }
                                let fd = new FormData();
                                fd.append("file", input.files[0]);
                                fd.append("type", "notcompress");
                                fetch("https://playentry.org/rest/picture", { method : "POST", body : fd}).then(r=>r.json()).then(j=>{
                                    res(j);
                                    input.remove();
                                });
                            }
                            document.body.append(input);
                            input.style.display = "none";
                            var h2 = document.querySelector("h2"), n;
                            if(h2){
                                n = h2.innerText;
                            }
                            var f = function(){
                                if(h2){
                                    h2.innerText = n;
                                    h2.style.textDecoration = "";
                                }
                                input.click();
                                document.body.removeEventListener("click", f);
                            };
                            f()
                        });
                    };
                    var wait = function(t){
                        return new Promise(function(s, j){
                            setTimeout(function(){s();}, t);
                        });
                    };
                    var cont = document.getElementsByName('Write')[0].value
                    var wrt = document.getElementById("Write");
                    if(wrt) {wrt.value = cont;}
                    await wait(100);
                    var id = "";
                    try {
                        id_ = await load();
                        id = id_._id
                        filename = id_.filename
                        filetype = '.' + id_.imageType.replace('jpg', 'jpeg')
                    } catch {
                        return;
                    }
                    if (document.location.href.indexOf("entrystory") >= 0) {
                        cont = e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].textContent
                        if(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes.length > 0){
                            e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].removeChild(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes[0])
                        }
                        e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].appendChild(new Text(cont + " https://playentry.org/uploads/"+filename.substring(0, 2)+"/"+filename.substring(2, 4)+"/"+filename+filetype))
                        e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].value = e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes[0].data
                        e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].style.height = String(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].scrollHeight)+'px'
                    }else if(document.location.href.includes("/group/community/")){
                        cont = e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].textContent
                        if(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes.length > 0){
                            e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].removeChild(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes[0])
                        }
                        e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].appendChild(new Text(cont + " https://playentry.org/uploads/"+filename.substring(0, 2)+"/"+filename.substring(2, 4)+"/"+filename+filetype))
                        e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].value = e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes[0].data
                        e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].style.height = String(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].scrollHeight)+'px'
                    }else {
                        cont = e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].textContent
                        if(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes.length > 0){
                            e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].removeChild(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes[0])
                        }
                        e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].appendChild(new Text(cont + " https://playentry.org/uploads/"+filename.substring(0, 2)+"/"+filename.substring(2, 4)+"/"+filename+filetype))
                        e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].value = e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].childNodes[0].data
                        e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].style.height = String(e.target.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.children[0].scrollHeight)+'px'
                    }
                })();
            })
        }
    }, 10)
    replay = ''
    userprofile = ''
    setInterval(async function(){
        if (document.location.pathname.split('/')[1] == 'profile'){
            if (document.querySelectorAll('div.css-s7u0jm.e1e59sjh1').length > 0 && userprofile != document.location.pathname.replaceAll('?', '/').split('/')[2]){
                replay = document.location.pathname.split('/')[2]
                var getIdeal = function(){
                    var next_data = document.getElementById("__NEXT_DATA__");
                    var nj = JSON.parse(next_data.innerText);
                    return {csrf: nj.props.initialProps.csrfToken, xtoken: nj.props.initialState.common.user.xToken};
                };
                idl = getIdeal();
                csrf = idl.csrf;
                xtoken = idl.xtoken
                user_info = (await (await fetch("https://playentry.org/graphql", {
                    "method": "POST",
                    "headers":{
                        "Content-Type": "application/json",
                        "x-client-type": "Client",
                        "CSRF-Token": csrf,
                        "x-token": xtoken
                    },
                    "body": JSON.stringify({
                        "query":"\n    query FIND_USERSTATUS_BY_USERNAME($id: String) {\n        userstatus(id: $id) {\n            id\n            nickname\n            username\n            description\n            shortUrl\n            profileImage {\n                \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n            }\n            coverImage {\n                \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n            }\n            role\n            mark {\n                \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n            }\n            studentTerm\n            status {\n                project\n                projectAll\n                study\n                studyAll\n                community {\n                    qna\n                    tips\n                    free\n                }\n                following\n                follower\n                bookmark {\n                    project\n                    study\n                }\n                userStatus\n            }\n        }\n    }\n",
                        "variables":{"id": document.location.pathname.replaceAll('?', '/').split('/')[2]}
                    })
                })).json()).data.userstatus.status
                username = document.querySelectorAll("strong.css-sbn8jm.e1e59sjh3")[0].children[0].textContent
                if (user_info.project > 0){
                    username = " (" + (await (await fetch("https://playentry.org/graphql", {
                        "method": "POST",
                        "headers":{
                            "Content-Type": "application/json",
                            "x-client-type": "Client",
                            "CSRF-Token": csrf,
                            "x-token": xtoken
                        },
                        "body": JSON.stringify({
                            "query":"\n    query SELECT_USER_PROJECTS(\n        \n    $user: String!\n    $query: String\n    $categoryCode: String\n    $groupId: ID\n    $pageParam: PageParam\n    $isOpen: Boolean\n    $except: [ID]\n    $searchAfter: JSON\n    $searchType: String\n    $term: String\n\n    ) {\n        userProjectList(\n            \n    user: $user\n    query: $query\n    categoryCode: $categoryCode\n    groupId: $groupId\n    pageParam: $pageParam\n    isOpen: $isOpen\n    except: $except\n    searchAfter: $searchAfter\n    searchType: $searchType\n    term: $term\n\n    ) {\n            total\n            list {\n                \n    id\n    name\n    user {\n        id\n        username\n        nickname\n        profileImage {\n            id\n            filename\n            imageType\n        }\n    }\n    thumb\n    isopen\n    isPracticalCourse\n    category\n    categoryCode\n    created\n    updated\n    special\n    isForLecture\n    isForStudy\n    isForSubmit\n    hashId\n    complexity\n    staffPicked\n    ranked\n    visit\n    likeCnt\n    comment\n    showComment\n\n            }\n            searchAfter\n        }\n    }\n",
                            "variables":{"searchType":"scroll","user":document.location.pathname.replaceAll('?', '/').split('/')[2],"term":"all","pageParam":{"display":1,"sort":"created"}}
                        })
                    })).json()).data.userProjectList.list[0].user.username + ")"
                }else if (user_info.community.qna > 0){
                    username = " (" + (await (await fetch("https://playentry.org/graphql", {
                        "method": "POST",
                        "headers":{
                            "Content-Type": "application/json",
                            "x-client-type": "Client",
                            "CSRF-Token": csrf,
                            "x-token": xtoken
                        },
                        "body": JSON.stringify({
                            "query":"\n    query SELECT_QNA_LIST(\n    $pageParam: PageParam\n    $query: String\n    $user: String\n    $category: String\n    $term: String\n    $prefix: String\n    $progress: String\n    $discussType: String\n    $searchType: String\n    $searchAfter: JSON\n){\n        discussList(\n    pageParam: $pageParam\n    query: $query\n    user: $user\n    category: $category\n    term: $term\n    prefix: $prefix\n    progress: $progress\n    discussType: $discussType\n    searchType: $searchType\n    searchAfter: $searchAfter\n) {\n            total\n            list {\n                \n    id\n    title\n    created\n    commentsLength\n    likesLength\n    visit\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n    mark {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n \n    }\n\n    }\n    bestComment {\n        content\n    }\n    thumbnail\n\n            }\n            searchAfter\n        }\n    }\n",
                            "variables":{"category":"qna","searchType":"scroll","user":document.location.pathname.replaceAll('?', '/').split('/')[2],"term":"all","pageParam":{"display":1,"sort":"created"}}
                        })
                    })).json()).data.discussList.list[0].user.username + ")"
                }else if (user_info.community.tips > 0){
                    username = " (" + (await (await fetch("https://playentry.org/graphql", {
                        "method": "POST",
                        "headers":{
                            "Content-Type": "application/json",
                            "x-client-type": "Client",
                            "CSRF-Token": csrf,
                            "x-token": xtoken
                        },
                        "body": JSON.stringify({
                            "query":"\n    query SELECT_DISCUSS_LIST(\n    $pageParam: PageParam\n    $query: String\n    $user: String\n    $category: String\n    $term: String\n    $prefix: String\n    $progress: String\n    $discussType: String\n    $searchType: String\n    $searchAfter: JSON\n){\n        discussList(\n    pageParam: $pageParam\n    query: $query\n    user: $user\n    category: $category\n    term: $term\n    prefix: $prefix\n    progress: $progress\n    discussType: $discussType\n    searchType: $searchType\n    searchAfter: $searchAfter\n) {\n            total\n            list {\n                \n    id\n    title\n    content\n    seContent\n    created\n    commentsLength\n    likesLength\n    visit\n    category\n    prefix\n    groupNotice\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n    mark {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n \n    }\n\n    }\n    images {\n        filename\n        imageUrl\n    }\n    sticker {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    progress\n    thumbnail\n    reply\n    bestComment {\n        \n    id\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n    mark {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n \n    }\n\n    }\n    content\n    created\n    removed\n    blamed\n    blamedBy\n    commentsLength\n    likesLength\n    isLike\n    hide\n    image {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    sticker {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n\n    }\n    blamed\n    description1\n    description2\n    description3\n\n            }\n            searchAfter\n        }\n    }\n",
                            "variables":{"category":"tips", "searchType":"scroll","user":document.location.pathname.replaceAll('?', '/').split('/')[2],"term":"all","pageParam":{"display":1,"sort":"created"}}
                        })
                    })).json()).data.discussList.list[0].user.username + ")"
                }else if(user_info.community.free > 0){
                    username = " (" + (await (await fetch("https://playentry.org/graphql", {
                        "method": "POST",
                        "headers":{
                            "Content-Type": "application/json",
                            "x-client-type": "Client",
                            "CSRF-Token": csrf,
                            "x-token": xtoken
                        },
                        "body": JSON.stringify({
                            "query":"\n    query SELECT_ENTRYSTORY(\n    $pageParam: PageParam\n    $query: String\n    $user: String\n    $category: String\n    $term: String\n    $prefix: String\n    $progress: String\n    $discussType: String\n    $searchType: String\n    $searchAfter: JSON\n){\n        discussList(\n    pageParam: $pageParam\n    query: $query\n    user: $user\n    category: $category\n    term: $term\n    prefix: $prefix\n    progress: $progress\n    discussType: $discussType\n    searchType: $searchType\n    searchAfter: $searchAfter\n) {\n            total\n            list {\n                \n\tid\n    content\n    created\n    commentsLength\n    likesLength\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n    mark {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n \n    }\n\n    }\n    image {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    sticker {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    isLike\n\n            }\n            searchAfter\n        }\n    }\n",
                            "variables":{"category":"free", "searchType":"scroll","user":document.location.pathname.replaceAll('?', '/').split('/')[2],"term":"all","pageParam":{"display":1,"sort":"created"}}
                        })
                    })).json()).data.discussList.list[0].user.username + ")"
                }
                if (document.querySelectorAll('div.css-s7u0jm.e1e59sjh1')[0].childElementCount > 2){
                    document.querySelectorAll('div.css-s7u0jm.e1e59sjh1')[0].removeChild(info)
                    info.removeChild(project)
                    info.removeChild(qna)
                    info.removeChild(tips)
                    info.removeChild(free)
                    project.removeChild(p)
                    qna.removeChild(q)
                    tips.removeChild(t)
                    free.removeChild(f)
                }else {
                    project = document.createElement('span')
                    p = document.createElement('em')
                    qna = document.createElement('span')
                    q = document.createElement('em')
                    tips = document.createElement('span')
                    t = document.createElement('em')
                    free = document.createElement('span')
                    f = document.createElement('em')
                }
                document.querySelectorAll("strong.css-sbn8jm.e1e59sjh3")[0].lastChild.textContent = username
                projects = user_info.projectAll - user_info.project
                communities = user_info.community
                p.style = 'color: rgb(22, 216, 163)'
                project.textContent = '비공개 작품 '
                p.textContent = String(projects)
                project.appendChild(p)
                q.style = 'color: rgb(22, 216, 163)'
                qna.textContent = '묻고 답하기 '
                q.textContent = String(communities.qna)
                qna.appendChild(q)
                t.style = 'color: rgb(22, 216, 163)'
                tips.textContent = '노하우 팁 '
                t.textContent = String(communities.tips)
                tips.appendChild(t)
                f.style = 'color: rgb(22, 216, 163)'
                free.textContent = '엔트리 이야기 '
                f.textContent = String(communities.free)
                free.appendChild(f)
                info = document.createElement('span')
                info.appendChild(project)
                info.appendChild(qna)
                info.appendChild(tips)
                info.appendChild(free)
                if (document.querySelectorAll('div.css-s7u0jm.e1e59sjh1')[0].childElementCount == 2){
                    document.querySelectorAll('div.css-s7u0jm.e1e59sjh1')[0].children[0].firstElementChild.style.color = 'rgb(22, 216, 163)'
                    document.querySelectorAll('div.css-s7u0jm.e1e59sjh1')[0].children[1].firstElementChild.style.color = 'rgb(22, 216, 163)'
                    document.querySelectorAll('div.css-s7u0jm.e1e59sjh1')[0].appendChild(info)
                    userprofile = document.location.pathname.replaceAll('?', '/').split('/')[2]
                }
            }
        }else{
            userprofile = ''
        }
    }, 10)
    setInterval(()=> ImageView(), 10)
    finded = ''
    usernick = ''
    u = true
    button = true
    user_id = null
    pf = true
    Rl = false
    setInterval((async function(){
        if (location.href.indexOf('/follow') > 0){
            Rl = true
        }
        if (document.querySelectorAll('input#CommonSearch').length > 0) {
            if (Rl){
                Rl = false
                location.reload()
            }
            if (document.location.pathname == '/us' && document.location.host == 'playentry.org' && finded != document.location.href ){
                if (user_id != null && pf == false && user_id != document.querySelector('input#CommonSearch').value){
                    console.log(pf)
                    document.querySelector('div.css-1em6nuk.ex6tgf88').removeChild(document.querySelector('div.css-1em6nuk.ex6tgf88').children[2])
                    pf = true
                }
                finded = document.location.href
                var getIdeal = function(){
                    var next_data = document.getElementById("__NEXT_DATA__");
                    var nj = JSON.parse(next_data.innerText);
                    return {csrf: nj.props.initialProps.csrfToken, xtoken: nj.props.initialState.common.user.xToken};
                };
                idl = getIdeal();
                csrf = idl.csrf;
                xtoken = idl.xtoken
                if (usernick != document.querySelector('input#CommonSearch').value){
                    usernick = document.querySelector('input#CommonSearch').value
                    user_id = (await (await fetch("/graphql", {
                        method: "POST",  
                        headers: {
                            "content-type": "application/json",
                            "x-client-type": "Client",
                            "CSRF-Token": csrf,
                            "x-token": xtoken
                            },
                        body:JSON.stringify({
                            query: `
                                query($nickname: String) {
                                    user(nickname:$nickname) {
                                        id
                                    }
                                }
                            `, 
                            variables: {
                                nickname: document.querySelector('input#CommonSearch').value
                            }
                        })
                    })).json()).data.user
                }
                if (user_id != null) {
                    if (document.querySelector('a.false.css-1xir1du.ex6tgf86').parentElement.childElementCount < 6){
                        user_info = (await (await fetch("https://playentry.org/graphql", {
                            "method": "POST",
                            "headers":{
                                "Content-Type": "application/json",
                                "x-client-type": "Client",
                                "CSRF-Token": csrf,
                                "x-token": xtoken
                            },
                            "body": JSON.stringify({
                                "query":"\n    query FIND_USERSTATUS_BY_USERNAME($id: String) {\n        userstatus(id: $id) {\n            id\n            nickname\n            username\n            description\n            shortUrl\n            profileImage {\n                \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n            }\n            coverImage {\n                \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n            }\n            role\n            mark {\n                \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n            }\n            studentTerm\n            status {\n                project\n                projectAll\n                study\n                studyAll\n                community {\n                    qna\n                    tips\n                    free\n                }\n                following\n                follower\n                bookmark {\n                    project\n                    study\n                }\n                userStatus\n            }\n        }\n    }\n",
                                "variables":{"id": user_id.id}
                            })
                        })).json()).data.userstatus
                        view = document.createElement('div')
                        view.className = 'css-mqzyfz ex6tgf85'
                        view.style.margin = '20px 0px 0px'
                        view.style.padding = '8px 0px 38px'
                        br = document.createElement('br')
                        view.append(br)
                        text = document.createElement('h3')
                        text.style.margin = '10px 0px 0px'
                        text.textContent = '유저'
                        text.style.fontSize = '26px'
                        text.style.fontWeight = 600
                        view.append(text)
                        nick = document.createElement('a')
                        nick.textContent = ' ' + document.querySelector('input#CommonSearch').value
                        nick.style.color = 'black'
                        nick.style.fontSize = '50px'
                        nick.style.fontWeight = 'bold'
                        nick.style.lineHeight = '120px'
                        page = document.createElement('div')
                        page.className = 'css-d3v9zr ebdmqkt3'
                        bar = document.createElement('div')
                        box = document.createElement('a')
                        bar.className = 'css-10snqeb ebdmqkt2'
                        profile = document.createElement('img')
                        profile.style.backgroundPosition = 'center'
                        profile.style.width = '120px'
                        profile.style.height = '120px'
                        profile.style.backgroundSize = '140%'
                        profile.style.borderRadius = '50%'
                        profile.style.border = '2px solid rgba(0, 0, 0, 0.1)'
                        profile.style.position = 'center'
                        box.style.width = '95px'
                        box.style.height = '95px'
                        box.href = 'https://playentry.org/profile/'+user_id.id+'/project'
                        box.append(br)
                        box.append(profile)
                        bar.append(box)
                        bar.append(nick)
                        page.append(bar)
                        view.append(page)
                        if (user_info != null){
                            if (user_info['profileImage'] == null) {
                                profile.style.backgroundImage = 'url("/img/DefaultCardUserThmb.svg")'
                            }else {
                                profile.style.backgroundImage = 'url("/uploads/'+user_info.profileImage.filename.substr(0,2) + '/'+user_info.profileImage.filename.substr(2,2)+'/'+user_info.profileImage.filename+'.'+user_info.profileImage.imageType+'")'
                            }
                            nick.href = 'https://playentry.org/profile/'+user_id.id+'/project'
                            if (pf){
                                document.querySelector('div.css-1em6nuk.ex6tgf88').children[1].insertAdjacentElement('afterEnd', view)
                                pf = false
                            }
                        }
                    }
                }
            }
        }else{
            pf = true
            user_id = null
            finded = ''
            usernick = ''
        }
    }), 10)
    searcha = true
    searchAfter = ''
    alarms = []
    check_alarm = 0
    setInterval(async function(){
        if (location.href == "https://playentry.org/alarm"){
            var getIdeal = function(){
                var next_data = document.getElementById("__NEXT_DATA__");
                var nj = JSON.parse(next_data.innerText);
                return {csrf: nj.props.initialProps.csrfToken, xtoken: nj.props.initialState.common.user.xToken};
            };
            idl = getIdeal()
            csrf = idl.csrf
            xtoken = idl.xtoken
            if (document.getElementsByClassName('alarm').length > 0){
                document.getElementsByClassName('alarm')[0].addEventListener('click', function(){
                    location.reload()
                })
            }
            if (document.getElementsByClassName('css-mop10c e5hayu94').length > 0){
                document.getElementsByClassName('css-mop10c e5hayu94')[0].addEventListener('click', function(){
                    location.reload()
                })
            }
            if (searcha){
                if (document.getElementsByClassName('css-kuuduf e1t7hnws3').length > 1){
                    document.getElementsByClassName('css-kuuduf e1t7hnws3')[1].addEventListener('click', function(){
                        alarm = []
                        check_alarm = 0
                        searchAfter = null
                    })
                }
                setInterval(()=> searcha = false, 1)
                alarm_list = (await (await fetch("https://playentry.org/graphql", {
                    "method": "POST",
                    "headers":{
                        "Content-Type": "application/json",
                        "x-client-type": "Client",
                        "CSRF-Token": csrf,
                        "x-token": xtoken
                    },
                    "body": JSON.stringify({
                        "query": "\n    query SELECT_TOPICS($pageParam: PageParam, $searchAfter: JSON){\n        topicList(pageParam: $pageParam, searchAfter: $searchAfter) {\n            searchAfter\n            list {\n                \n    id\n    params\n    template\n    thumbUrl\n    category\n    target\n    isRead\n    created\n    updated\n    link {\n        category\n        target\n        hash\n        groupId\n    }\n    topicinfo {\n        category\n        targetId\n    }\n\n            }\n        }\n    }\n",
                        "variables":{
                            "pageParam":{"display":20}
                        }
                    })
                })).json()).data.topicList
                if (alarms.length < document.getElementsByTagName('dd').length){
                    alarms = alarms.concat(alarm_list.list)
                }
                searchAfter = alarm_list.searchAfter
                if (document.getElementsByClassName('css-7ndem5 e1t7hnws1').length > 0){
                    document.getElementsByClassName('css-7ndem5 e1t7hnws1')[0].addEventListener('click', (async function(){
                        if (searchAfter != null) {
                            alarm_list = (await (await fetch("https://playentry.org/graphql", {
                                "method": "POST",
                                "headers":{
                                    "Content-Type": "application/json",
                                    "x-client-type": "Client",
                                    "CSRF-Token": csrf,
                                    "x-token": xtoken
                                },
                                "body": JSON.stringify({
                                    "query": "\n    query SELECT_TOPICS($pageParam: PageParam, $searchAfter: JSON){\n        topicList(pageParam: $pageParam, searchAfter: $searchAfter) {\n            searchAfter\n            list {\n                \n    id\n    params\n    template\n    thumbUrl\n    category\n    target\n    isRead\n    created\n    updated\n    link {\n        category\n        target\n        hash\n        groupId\n    }\n    topicinfo {\n        category\n        targetId\n    }\n\n            }\n        }\n    }\n",
                                    "variables":{
                                        "pageParam":{"display":20},
                                        "searchAfter":searchAfter
                                    }
                                })
                            })).json()).data.topicList
                            setTimeout(function(){
                                if (alarms.length < document.getElementsByTagName('dd').length){
                                    alarms = alarms.concat(alarm_list.list)
                                    searchAfter = alarm_list.searchAfter
                                }
                                alarm_list = []
                                check_alarm = 0
                            }, 40)
                        }
                    }))
                }
            }
            sp = document.createElement('span')
            sp.hidden = true
            if (check_alarm < alarms.length){
                alarm_box = document.getElementsByTagName('dd')
                document.getElementsByTagName('dd')[check_alarm].firstChild.nextElementSibling.addEventListener('click', async function(e){
                    n = Number(e.target.parentElement.lastChild.textContent)
                    if (searchAfter != null) {
                        alarm_list = (await (await fetch("https://playentry.org/graphql", {
                            "method": "POST",
                            "headers":{
                                "Content-Type": "application/json",
                                "x-client-type": "Client",
                                "CSRF-Token": csrf,
                                "x-token": xtoken
                            },
                            "body": JSON.stringify({
                                "query": "\n    query SELECT_TOPICS($pageParam: PageParam, $searchAfter: JSON){\n        topicList(pageParam: $pageParam, searchAfter: $searchAfter) {\n            searchAfter\n            list {\n                \n    id\n    params\n    template\n    thumbUrl\n    category\n    target\n    isRead\n    created\n    updated\n    link {\n        category\n        target\n        hash\n        groupId\n    }\n    topicinfo {\n        category\n        targetId\n    }\n\n            }\n        }\n    }\n",
                                "variables":{
                                    "pageParam":{"display":1},
                                    "searchAfter":searchAfter
                                }
                            })
                        })).json()).data.topicList
                        alarms.splice(n, 1)
                        alarms.push(alarm_list.list[0])
                        searchAfter = alarm_list.searchAfter
                        alarm_list = []
                        setTimeout(()=> check_alarm = 0, 40)
                    }else{
                        setTimeout(()=> check_alarm = 0, 40)
                    }
                })
                sp.textContent = String(check_alarm)
                document.getElementsByTagName('dd')[check_alarm].appendChild(sp)
                if (alarms[check_alarm].link.category == 'free'){
                    document.getElementsByTagName('dd')[check_alarm].firstChild.style.cursor = 'pointer'
                    document.getElementsByTagName('dd')[check_alarm].firstChild.addEventListener('click', function(e){
                        location.href = 'https://playentry.org/community/entrystory/'+alarms[Number(e.target.parentElement.lastChild.textContent)].link.target
                    })
                    document.getElementsByTagName('dd')[check_alarm].firstChild.firstChild.addEventListener('click', function(e){
                        location.href = 'https://playentry.org/community/entrystory/'+alarms[Number(e.target.parentElement.parentElement.lastChild.textContent)].link.target
                    })
                    document.getElementsByTagName('dd')[check_alarm].firstChild.firstChild.firstChild.addEventListener('click', function(e){
                        location.href = 'https://playentry.org/community/entrystory/'+alarms[Number(e.target.parentElement.parentElement.parentElement.lastChild.textContent)].link.target
                    })
                    for (let m=0; m < document.getElementsByTagName('dd')[check_alarm].firstChild.firstChild.firstChild.childNodes.length; m++){
                        document.getElementsByTagName('dd')[check_alarm].firstChild.firstChild.firstChild.childNodes[m].addEventListener('click', function(e){
                            location.href = 'https://playentry.org/community/entrystory/'+alarms[Number(e.target.parentElement.parentElement.parentElement.parentElement.lastChild.textContent)].link.target
                        })
                    }
                }
                check_alarm = check_alarm + 1
            }
        }else{
            searchAfter = undefined
            alarms = []
            check_alarm = 0
            searcha = true
        }
    }, 4)
})
