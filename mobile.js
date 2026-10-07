(function(){
if(!matchMedia('(max-width:768px)').matches&&!window.__mForce)return;
var d=document,$=function(s,r){return(r||d).querySelector(s)},$$=function(s,r){return[].slice.call((r||d).querySelectorAll(s))};
var ic=function(p){return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+p+'"/></svg>'};
var P={home:'M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6',users:'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M16 11a2.5 2.5 0 1 0 0-5M17 14c2.5.3 4 2.4 4 5',chat:'M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.2A8 8 0 1 1 21 12zM8.5 11h7M8.5 14h4',doc:'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7',user:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',pin:'M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4',info:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01',phone:'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',x:'M6 6l12 12M18 6L6 18',menu:'M4 7h16M4 12h16M4 17h10',down:'M6 9l6 6 6-6',grid:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'};
/* شناسه‌ی بخش‌ها */
var hero=$('.hero'),lw=$('.lawyer-slider-section'),ct=$('.why .contact'),bl=$('.blog'),ct2=$('.location-wrapper'),seo=$('.seo-wrap'),ft=$('footer');
if(hero)hero.id='m-home';if(lw)lw.id='m-lawyers';if(ct)ct.id='m-consult';if(bl)bl.id='m-articles';if(ct2)ct2.id='m-cities';if(seo)seo.id='m-about';if(ft)ft.id='m-contact';
/* منوی کشویی */
var logo=$('.logo img'),tel='tel:+989362095065';
var items=[['صفحه اصلی','home','#m-home'],['شهرها','pin','#m-cities'],['مقالات حقوقی','doc','#m-articles'],['همکاری با ما','users','#m-consult'],['درباره ما','info','#m-about'],['تماس با ما','phone','#m-contact']];
var dr=d.createElement('aside');dr.className='m-drawer';dr.setAttribute('aria-label','منو');
dr.innerHTML='<div class="m-drawer__top">'+(logo?'<img src="'+logo.src+'" alt="وکلا">':'')+'<button class="m-close" aria-label="بستن">'+ic(P.x)+'</button></div><div class="m-drawer__list">'+items.map(function(i){return '<a href="'+i[2]+'">'+ic(P[i[1]])+i[0]+'</a>'}).join('')+'</div><a class="m-drawer__cta" href="'+tel+'">'+ic(P.phone)+'<span><small>رزرو مشاوره حقوقی</small><b>0936 209 5065</b><small>شنبه تا چهارشنبه، ۸ تا ۱۸</small></span></a>';
var ov=d.createElement('div');ov.className='m-overlay';
var bg=d.createElement('button');bg.className='m-burger';bg.setAttribute('aria-label','باز کردن منو');bg.innerHTML=ic(P.menu);
var bar=$('.top .wrap');if(bar)bar.appendChild(bg);d.body.appendChild(ov);d.body.appendChild(dr);
function tog(o){d.documentElement.classList.toggle('m-open',o)}
bg.onclick=function(){tog(true)};ov.onclick=function(){tog(false)};$('.m-close',dr).onclick=function(){tog(false)};
$$('.m-drawer__list a',dr).forEach(function(a){a.onclick=function(e){e.preventDefault();tog(false);go(a.getAttribute('href'))}});
function go(h){var t=$(h);if(t)window.scrollTo({top:t.getBoundingClientRect().top+scrollY-(h==='#m-home'?0:70),behavior:'smooth'})}
/* نوار پایین */
var tabs=[['خانه','home','#m-home'],['وکلا','users','#m-lawyers'],['مشاوره','chat','#m-consult','cta'],['مقالات','doc','#m-articles'],['ورود','user','#login']];
var tb=d.createElement('div');tb.className='m-tabbar';tb.setAttribute('role','navigation');tb.setAttribute('aria-label','ناوبری سریع');
tb.innerHTML=tabs.map(function(t){return '<a class="m-tab'+(t[3]?' m-tab--cta':'')+'" href="'+t[2]+'">'+(t[3]?'<i>'+ic(P[t[1]])+'</i>':ic(P[t[1]]))+'<span>'+t[0]+'</span></a>'}).join('');
d.body.appendChild(tb);
$$('.m-tab',tb).forEach(function(a){a.onclick=function(e){var h=a.getAttribute('href');if(h==='#login'){e.preventDefault();var l=$('.btn.login');if(l)l.click();return}e.preventDefault();go(h)}});
/* اسکرول‌اسپای */
var map=[['#m-home',0],['#m-lawyers',1],['#m-consult',2],['#m-articles',3]];
function spy(){var y=scrollY+innerHeight*.35,a=0;map.forEach(function(m){var t=$(m[0]);if(t&&t.getBoundingClientRect().top+scrollY<=y)a=m[1]});$$('.m-tab',tb).forEach(function(x,i){x.classList.toggle('on',i===a&&i!==2)})}
addEventListener('scroll',spy,{passive:true});spy();
/* نمایش همه‌ی تخصص‌ها */
var tiles=$('.tiles');
if(tiles){var all=$$('.tile',tiles);all.slice(9).forEach(function(t){t.classList.add('m-hide')});
var mb=d.createElement('button');mb.className='m-more';mb.innerHTML='<span>نمایش همه‌ی تخصص‌ها ('+all.length+')</span>'+ic(P.down);tiles.after(mb);
mb.onclick=function(){var o=tiles.classList.toggle('m-open-all');mb.classList.toggle('on',o);$('span',mb).textContent=o?'نمایش کمتر':'نمایش همه‌ی تخصص‌ها ('+all.length+')'}}
$$('.slide p').forEach(function(p){p.innerHTML=p.innerHTML.replace(/<br\s*\/?>/g,' ')});
/* کارت شناور تماس در فوتر */
if(ft){var fc=d.createElement('a');fc.className='m-fcall';fc.href=tel;fc.innerHTML='<span class="m-fcall__txt"><small>رزرو مشاوره حقوقی</small><b>0936 209 5065</b><small>شنبه تا چهارشنبه، ۸ تا ۱۸</small></span><span class="m-fcall__btn">'+ic(P.phone)+'</span>';ft.insertBefore(fc,ft.firstChild)}
/* سوایپ هیرو */
if(hero){var x0=null;hero.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
hero.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>45){var b=$(dx<0?'.hnext':'.hprev');if(b)b.click()}},{passive:true})}
})();
