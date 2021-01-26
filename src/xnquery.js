(function (window) {
    function init(el){
        if(typeof el =='string'){
        this.el=document.querySelectorAll(el);
        }
        if(el instanceof NodeList){
            this.el=el;
        }
        if(el instanceof Node){
            this.el=this.reverseArryToNodeList([el])
        }
    }
    function XNQuery(el){
        return new init(el);
    }
    XNQuery.prototype=init.prototype={
        extend(){
            var options, name, src, copy, copyIsArray, clone,
                target = arguments[0] || {}, // 目标对象
                i = 1,
                length = arguments.length,
                deep = false;
            // 处理深度拷贝情况（第一个参数是boolean类型且为true）
            if ( typeof target === "boolean" ) {
                deep = target;
                target = arguments[1] || {};
                // 跳过第一个参数（是否深度拷贝）和第二个参数（目标对象）
                i = 2;
            }
            // 如果目标不是对象或函数，则初始化为空对象
            if ( typeof target !== "object" ) {
                target = {};
            }
            // 如果只指定了一个参数，则使用jQuery自身作为目标对象
            if ( length === i ) {
                target = this;
                --i;
            }
            for ( ; i < length; i++ ) {
                // Only deal with non-null/undefined values
                if ( (options = arguments[ i ]) != null ) {
                    // Extend the base object
                    for ( name in options ) {
                        src = target[ name ];
                        copy = options[ name ];
                        // Prevent never-ending loop
                        if ( target === copy ) {
                            continue;
                        }
                        // 如果对象中包含了数组或者其他对象，则使用递归进行拷贝
                        if ( deep && copy && ( typeof copy =='object' || (copyIsArray = Array.isArray(copy)) ) ) {
                            // 处理数组
                            if ( copyIsArray ) {
                                copyIsArray = false;
                                // 如果目标对象不存在该数组，则创建一个空数组；
                                clone = src && Array.isArray(src) ? src : [];
                            } else {
                                clone = src && typeof src =='object' ? src : {};
                            }
                            // 从不改变原始对象，只做拷贝
                            target[ name ] = this.extend( deep, clone, copy );
                            // 不拷贝undefined值
                        } else if ( copy !== undefined ) {
                            target[ name ] = copy;
                        }
                    }
                }
            }
            // 返回已经被修改的对象
            return target;
        },
        parents( parentSelector /* optional */) {
            let el=this.el.item(0)
            if (parentSelector === undefined) {
                parentSelector = this.reverseArryToNodeList([document]);
            }
            else{
                parentSelector=document.querySelectorAll(parentSelector)
            }
            var parents = [];
            parentSelector.forEach((e)=>{
                var p=el.parentNode;
                while (p == e && p!=null) {
                    var o = p;
                    parents.push(o);
                    p = o.parentNode;
                }
            })
            return XNQuery(this.reverseArryToNodeList(parents))
            // var p = el.parentNode;
            // console.log(parentSelector,p)
            // while (p !== parentSelector && p!=null) {
            //     var o = p;
            //     console.log(o)
            //     parents.push(o);
            //     p = o.parentNode;
            // }
            // parents.push(parentSelector); // Push that parentSelector you wanted to stop at
            // console.log(parents);
            // // return parents;
            // return XNQuery(this.reverseArryToNodeList(parents))
        },
        // parents(selector = '*') {
        //     if(!this.el || !this.el.item(0)){
        //         return this.reverseArryToNodeList([]);
        //     }
        //     const matchesSelector = this.el.item(0).matches || this.el.item(0).webkitMatchesSelector || this.el.item(0).mozMatchesSelector || this.el.item(0).msMatchesSelector
        //     const parentsMatch = [];
        //     let el=this.el.item(0).parentElement;
        //     console.log(this.el.item(0).parentNode.nodeName)
        //     while (el!== null) {
        //         console.log(el)
        //         if (matchesSelector.call(el, selector)) {
        //             parentsMatch.push(el)
        //         }
        //         el=el.parentElement;
        //     }
        //     return XNQuery(this.reverseArryToNodeList(parentsMatch))
        // },
        reverseArryToNodeList(arry){
            var div=document.createElement('div')
            for(let i=0;i<arry.length;i++){
                div.appendChild(arry[i])
            }
            return div.childNodes;
        },
        hasClass(className){
            if(this.el.length>0){
            return this.el.item(0).classList.contains(className);}
            else{
                return false;
            }
        },
        attr(attr,value){
            this.el.forEach((e)=>{
                if(!value){
                    e.getAttribute(attr)}
                else{
                    e.setAttribute(attr,value)
                }
            })

        },
        find(query){
            if(!this.el){
                return XNQuery(this.reverseArryToNodeList([]));
            }
            return XNQuery(this.el.item(0).querySelectorAll(query));
        },
        each(i,ele){
            return this.el.forEach((ele,i))
        },
        index(targetDom){
            var index;
            return index;
        },
        eq(index){
            var el=this.el.item(index);
            if(el){
            return XNQuery(this.reverseArryToNodeList([el]))}
            else{
                return XNQuery(this.reverseArryToNodeList([]))
            }
        },
        get(index){
            return this.el.item(index)
        },
        addClass(classname){
            this.el.forEach((e)=>{
                e.classList.add(classname)
            })
        },
        nextUntil(query){},
        prevAll(query){},
        nextAll(query){},
        removeClass(classname){
            this.el.forEach((e)=>{
                e.classList.remove(classname)
            })
        },
        val(val){
            if(!val){
                return this.el[0].value;
            }
            else{
                this.el.forEach((e)=>{
                    e.value=val;
                })
            }
        },
        html(val){
            if(!val){
                return this.el[0].innerHTML;
            }
            else{
                this.el.forEach((e)=>{
                    e.innerHTML=val;
                })
            }
        },
        empty(){
            this.el.forEach((e)=>{
                e.innerHTML='';
            })
            return this;
        },
        parseToDOM(str){
            var div = document.createElement("div");
            if(typeof str == "string"){
                div.innerHTML = str;}
            return div.childNodes;
        },
        append(newel){
            var newele;
            if(typeof newel=='string'){
                newele=this.parseToDOM(newel)
            }
            else{
                newele=this.reverseArryToNodeList([newel]);
            }
            newele.forEach((newe)=>{
                this.el.forEach((e)=>{
                    e.appendChild(newe)
                })
            })
            // for(let i=0;i<newele.length;i++){
            //
            // }

        },
        remove(){
            this.el.forEach((e)=>{
                e.parentNode.removeChild(e)
            })

        },
        slideUp(){
            this.el.forEach((e)=>{
                e.style.display='block'
            })
        }
    }
    XNQuery.extend=XNQuery.prototype.extend;
    window.$=XNQuery;
})(window)
