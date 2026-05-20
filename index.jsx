import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════
   كن عندك  ·  KAN INDAK  ·  v4
════════════════════════════════════════════ */

const C = {
  bg:"#050A14", card:"#0C1428", card2:"#0F1A30",
  border:"#1A2A45", gold:"#D4A94A", gold2:"#F0C86A",
  green:"#22C55E", red:"#EF4444", blue:"#3B82F6",
  pink:"#EC4899", text:"#E8EDF5", muted:"#4A5568", sub:"#8896A8",
};

/* ── Tasks ─────────────────────────────────── */
const DAILY_TASKS = [
  {id:"fajr",    cat:"🕌 الصلوات", label:"صلاة الفجر",                      pts:15},
  {id:"dhuhr",   cat:"🕌 الصلوات", label:"صلاة الظهر",                      pts:10},
  {id:"asr",     cat:"🕌 الصلوات", label:"صلاة العصر",                      pts:10},
  {id:"maghrib", cat:"🕌 الصلوات", label:"صلاة المغرب",                     pts:10},
  {id:"isha",    cat:"🕌 الصلوات", label:"صلاة العشاء",                     pts:10},
  {id:"tarawih", cat:"🕌 الصلوات", label:"صلاة التراويح",                   pts:12},
  {id:"witr",    cat:"🕌 الصلوات", label:"صلاة الوتر",                      pts:5},
  {id:"sn_fajr",    cat:"📿 السنن", label:"سنة الفجر القبلية",              pts:5},
  {id:"sn_dhuhr1",  cat:"📿 السنن", label:"سنة الظهر القبلية (4 ركعات)",   pts:4},
  {id:"sn_dhuhr2",  cat:"📿 السنن", label:"سنة الظهر البعدية (ركعتان)",    pts:3},
  {id:"sn_asr",     cat:"📿 السنن", label:"سنة العصر (4 ركعات)",           pts:3},
  {id:"sn_maghrib", cat:"📿 السنن", label:"سنة المغرب البعدية (ركعتان)",   pts:3},
  {id:"sn_isha",    cat:"📿 السنن", label:"سنة العشاء البعدية (ركعتان)",   pts:3},
  {id:"qiyam",      cat:"📿 السنن", label:"قيام الليل",                     pts:10},
  {id:"duha",       cat:"📿 السنن", label:"صلاة الضحى",                     pts:8},
  {id:"quran_rd",   cat:"📖 القرآن", label:"قراءة الورد اليومي",            pts:15},
  {id:"quran_hfz",  cat:"📖 القرآن", label:"مراجعة المحفوظ أو حفظ جديد",  pts:10},
  {id:"quran_tdhr", cat:"📖 القرآن", label:"تدبر آية وتأمل معناها",         pts:7},
  {id:"quran_sma",  cat:"📖 القرآن", label:"الاستماع لتلاوة قارئ متقن",    pts:5},
  {id:"ath_sabah",  cat:"🤲 الأذكار", label:"أذكار الصباح كاملة",           pts:8},
  {id:"ath_masa",   cat:"🤲 الأذكار", label:"أذكار المساء كاملة",           pts:8},
  {id:"ath_tasbih", cat:"🤲 الأذكار", label:"التسبيح 100 مرة",              pts:4},
  {id:"ath_hamd",   cat:"🤲 الأذكار", label:"التحميد 100 مرة",              pts:4},
  {id:"ath_takbir", cat:"🤲 الأذكار", label:"التكبير 100 مرة",              pts:4},
  {id:"ath_istgh",  cat:"🤲 الأذكار", label:"الاستغفار 100 مرة",            pts:6},
  {id:"ath_sala",   cat:"🤲 الأذكار", label:"الصلاة على النبي ﷺ 100 مرة",  pts:5},
  {id:"ath_sleep",  cat:"🤲 الأذكار", label:"أذكار النوم",                  pts:3},
  {id:"ath_eat",    cat:"🤲 الأذكار", label:"أذكار الأكل والشرب",           pts:2},
  {id:"ath_dua",    cat:"🤲 الأذكار", label:"الدعاء عند الإفطار",           pts:5},
  {id:"ath_sehri",  cat:"🤲 الأذكار", label:"الدعاء عند السحور",            pts:3},
  {id:"sadaqa",    cat:"💝 العبادات", label:"الصدقة ولو قليلة",             pts:8},
  {id:"silah",     cat:"💝 العبادات", label:"صلة الرحم (اتصال أو زيارة)",  pts:7},
  {id:"birr",      cat:"💝 العبادات", label:"بر الوالدين",                  pts:8},
  {id:"itar",      cat:"💝 العبادات", label:"إطعام صائم أو محتاج",          pts:8},
  {id:"ghaib_dua", cat:"💝 العبادات", label:"الدعاء لأهل في ظهر الغيب",    pts:4},
  {id:"sirah",     cat:"💝 العبادات", label:"قراءة في السيرة النبوية",      pts:5},
  {id:"ilm",       cat:"💝 العبادات", label:"تعلم علم نافع أو مشاركته",    pts:6},
  {id:"akhl_ghaib",cat:"😊 الأخلاق", label:"تجنب الغيبة والنميمة",         pts:6},
  {id:"akhl_kdhb", cat:"😊 الأخلاق", label:"تجنب الكذب",                   pts:6},
  {id:"akhl_smh",  cat:"😊 الأخلاق", label:"العفو والصفح عمن أساء",        pts:5},
  {id:"akhl_smt",  cat:"😊 الأخلاق", label:"الابتسامة في وجوه الناس",      pts:3},
  {id:"akhl_ltf",  cat:"😊 الأخلاق", label:"حسن المعاملة مع الجميع",       pts:4},
  {id:"akhl_sabr", cat:"😊 الأخلاق", label:"الصبر على الأذى",              pts:5},
  {id:"tawba",     cat:"✨ التوبة",   label:"التوبة والاستغفار الصادق",     pts:10},
  {id:"muhsb",     cat:"✨ التوبة",   label:"محاسبة النفس قبل النوم",       pts:5},
  {id:"niya",      cat:"✨ التوبة",   label:"تجديد النية لله تعالى",        pts:4},
];
const TOTAL_MAX = DAILY_TASKS.reduce((s,t)=>s+t.pts,0);
const TASK_CATS = ["الكل",...new Set(DAILY_TASKS.map(t=>t.cat))];

const DAYS_TITLES=["النية والإخلاص","الصبر والشكر","تلاوة القرآن","الدعاء والتضرع","صلاة التراويح","الإنفاق والصدقة","صلة الرحم","ذكر الله","التوبة والاستغفار","الإحسان للجيران","قراءة السيرة","حسن الخلق","الأمانة والصدق","العفو والصفح","الشكر والحمد","التفكر والتأمل","الزكاة والعطاء","احترام الوالدين","التواضع","العلم والتعلم","الإيثار والكرم","الوفاء بالعهد","حسن الظن بالله","الرحمة","الاجتهاد","مراجعة النفس","التوكل على الله","الإعداد للعيد","ليلة القدر","ختم رمضان"];
const DAYS_ICONS=["🌙","⭐","📖","🤲","🕌","💝","👨‍👩‍👧","📿","💧","🏠","📚","😊","🤝","❤️","🙏","💭","💰","👨‍👩‍👦","🕊️","🎓","🎁","📜","✨","🌸","🌟","🔍","🙌","🎉","✨","🏆"];

const initUsers=[
  {id:1,name:"أحمد محمد",  email:"ahmed@test.com", password:"123456",  phone:"0501234567",age:"22",avatar:"أ",role:"student",joinDate:"2024-03-01",bio:"طالب متحمس",progress:{},bonusPoints:0},
  {id:2,name:"فاطمة علي",  email:"fatima@test.com",password:"123456",  phone:"0509876543",age:"20",avatar:"ف",role:"student",joinDate:"2024-03-01",bio:"أحب القرآن",  progress:{},bonusPoints:5},
  {id:3,name:"مشرف النظام",email:"admin@admin.com", password:"admin123",phone:"0500000000",age:"35",avatar:"م",role:"admin",  joinDate:"2024-01-01",bio:"مشرف المنصة",progress:{},bonusPoints:0},
];
const initFeed=[
  {id:1,userId:1,userName:"أحمد محمد",userAvatar:"أ",content:"الحمد لله أتممت ختمة القرآن هذا الشهر 🌙 نسأل الله القبول",likes:[],comments:[],date:"2024-03-10T10:30:00"},
  {id:2,userId:2,userName:"فاطمة علي",userAvatar:"ف",content:"من أروع ما سمعته: «إذا وجدت قسوةً في قلبك فأكثر من قراءة القرآن» ❤️",likes:[],comments:[],date:"2024-03-09T18:00:00"},
];

/* ── Helpers ──────────────────────────────── */
const calcScore=(tasks=[])=>DAILY_TASKS.filter(t=>tasks.includes(t.id)).reduce((s,t)=>s+t.pts,0);
const calcDayPct=(tasks=[])=>Math.round((calcScore(tasks)/TOTAL_MAX)*100);
const calcTotal=(progress={},bonus=0)=>Object.values(progress).reduce((s,v)=>s+(v.score||0),0)+(bonus||0);
const calcPct=(progress={})=>{
  const done=Object.keys(progress).length;
  if(!done)return 0;
  return Math.round((Object.values(progress).reduce((s,v)=>s+(v.score||0),0)/(done*TOTAL_MAX))*100);
};
const fmt=(iso)=>new Date(iso).toLocaleDateString("ar-EG",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});

/* ── Micro Components ─────────────────────── */
const Ring=({pct,size=80,sw=7,color=C.gold})=>{
  const r=(size-sw)/2,c=2*Math.PI*r;
  return(<svg width={size} height={size}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={sw}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw} strokeDasharray={c} strokeDashoffset={c*(1-pct/100)} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"stroke-dashoffset 1s ease"}}/><text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill={color} fontSize={size<55?10:size<75?13:15} fontWeight="800">{pct}%</text></svg>);
};
const Av=({ch,size=38,color=C.gold})=>(<div style={{width:size,height:size,borderRadius:"50%",background:`linear-gradient(135deg,${color},${color}77)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.42,fontWeight:900,color:C.bg,flexShrink:0,border:`2px solid ${color}44`}}>{ch}</div>);
const Pill=({children,color=C.gold,sm})=>(<span style={{background:color+"18",color,border:`1px solid ${color}33`,borderRadius:20,padding:sm?"1px 7px":"3px 11px",fontSize:sm?10:11,fontWeight:700,whiteSpace:"nowrap"}}>{children}</span>);
const KiInput=({label,...p})=>(<div style={{display:"flex",flexDirection:"column",gap:5}}>{label&&<label style={{color:C.sub,fontSize:12,fontWeight:600}}>{label}</label>}<input className="ki-in" {...p}/></div>);

/* ── Logo SVG ─────────────────────────────── */
const Logo=({sz=44})=>(
  <svg width={sz} height={sz} viewBox="0 0 100 100" fill="none">
    <defs>
      <radialGradient id="glw" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={C.gold2} stopOpacity=".3"/>
        <stop offset="100%" stopColor={C.gold2} stopOpacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="46" fill="url(#glw)"/>
    {/* Crescent */}
    <path d="M50 10 A40 40 0 1 0 90 50 A28 28 0 1 1 50 10Z" fill={C.gold} opacity=".92"/>
    {/* Stars */}
    <polygon points="68,16 70,22 76,22 71,26 73,32 68,28 63,32 65,26 60,22 66,22" fill={C.gold2}/>
    <polygon points="78,38 79.5,43 85,43 80.5,46 82,51 78,48 74,51 75.5,46 71,43 76.5,43" fill={C.gold2} opacity=".7"/>
    {/* Center star */}
    <polygon points="38,38 40.5,46 48,46 42,50.5 44.5,58.5 38,54 31.5,58.5 34,50.5 28,46 35.5,46" fill={C.gold2} opacity=".9"/>
  </svg>
);

/* ── Splash Screen ────────────────────────── */
const Splash=({onDone})=>{
  const [phase,setPhase]=useState(0);
  useEffect(()=>{
    const t1=setTimeout(()=>setPhase(1),400);
    const t2=setTimeout(()=>setPhase(2),1200);
    const t3=setTimeout(()=>setPhase(3),2200);
    const t4=setTimeout(()=>onDone(),3200);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);clearTimeout(t4);};
  },[]);
  return(
    <div style={{position:"fixed",inset:0,background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:9999,
      backgroundImage:`radial-gradient(ellipse 70% 50% at 50% 30%,${C.gold}0d,transparent 70%)`}}>
      {/* Animated rings */}
      <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",border:`1px solid ${C.gold}18`,animation:"spRing 3s ease-in-out infinite"}}/>
      <div style={{position:"absolute",width:220,height:220,borderRadius:"50%",border:`1px solid ${C.gold}22`,animation:"spRing 3s ease-in-out infinite",animationDelay:".5s"}}/>
      {/* Logo */}
      <div style={{opacity:phase>=1?1:0,transform:phase>=1?"scale(1) translateY(0)":"scale(.5) translateY(30px)",transition:"all .8s cubic-bezier(.34,1.56,.64,1)",animation:phase>=1?"spFloat 3s ease-in-out infinite":"none"}}>
        <Logo sz={90}/>
      </div>
      {/* Name */}
      <div style={{marginTop:24,opacity:phase>=2?1:0,transform:phase>=2?"translateY(0)":"translateY(20px)",transition:"all .6s ease .2s"}}>
        <div style={{fontFamily:"Tajawal",fontWeight:900,fontSize:38,color:C.gold,textAlign:"center",letterSpacing:3}}>كن عندك</div>
        <div style={{color:C.muted,fontSize:13,textAlign:"center",letterSpacing:5,marginTop:4}}>KAN INDAK</div>
      </div>
      {/* Tagline */}
      <div style={{marginTop:16,opacity:phase>=3?1:0,transform:phase>=3?"translateY(0)":"translateY(10px)",transition:"all .5s ease",color:C.sub,fontSize:13,textAlign:"center"}}>
        رحلتك الروحية في ثلاثين يوماً مباركاً
      </div>
      {/* Loading dots */}
      <div style={{position:"absolute",bottom:60,display:"flex",gap:8,opacity:phase>=2?1:0,transition:"opacity .4s"}}>
        {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:C.gold,animation:`spDot 1.2s ease-in-out infinite`,animationDelay:`${i*.2}s`}}/>)}
      </div>
    </div>
  );
};

/* ── Confirm Dialog ───────────────────────── */
const Confirm=({msg,onYes,onNo})=>(
  <div style={{position:"fixed",inset:0,background:"#000b",zIndex:8888,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:28,maxWidth:340,width:"100%",boxShadow:`0 24px 64px #000c`,animation:"cfIn .25s ease"}}>
      <div style={{fontSize:32,textAlign:"center",marginBottom:12}}>⚠️</div>
      <div style={{color:C.text,fontSize:15,fontWeight:700,textAlign:"center",marginBottom:20,lineHeight:1.6}}>{msg}</div>
      <div style={{display:"flex",gap:10}}>
        <button onClick={onNo}  className="ki-btn" style={{flex:1,background:C.card2,color:C.sub,  border:`1px solid ${C.border}`,padding:"11px 0",fontSize:14}}>لا، إلغاء</button>
        <button onClick={onYes} className="ki-btn" style={{flex:1,background:C.red,  color:"#fff", border:"none",padding:"11px 0",fontSize:14}}>نعم، تأكيد</button>
      </div>
    </div>
  </div>
);

/* ── Hamburger Menu ───────────────────────── */
const HamMenu=({curUser,page,setPage,onLogout,confirm})=>{
  const [open,setOpen]=useState(false);
  const ref=useRef();
  useEffect(()=>{
    const h=(e)=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[]);
  const go=(p)=>{setPage(p);setOpen(false);};
  const items=[
    {p:"home",   icon:"🏠", label:"الرئيسية"},
    {p:"forum",  icon:"💬", label:"المجتمع"},
    {p:"profile",icon:"👤", label:"ملفي الشخصي"},
    ...(curUser?.role==="admin"?[{p:"admin",icon:"🛡️",label:"لوحة الإدارة"}]:[]),
  ];
  return(
    <div ref={ref} style={{position:"relative"}}>
      <button onClick={()=>setOpen(o=>!o)} className="ki-btn"
        style={{background:open?C.gold+"22":"transparent",border:`1px solid ${open?C.gold+"55":C.border}`,
          color:open?C.gold:C.sub,width:40,height:40,borderRadius:12,display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",gap:5,padding:0}}>
        {[0,1,2].map(i=>(
          <span key={i} style={{display:"block",width:18,height:2,background:"currentColor",borderRadius:2,
            transition:"all .25s",
            transform:open&&i===0?"rotate(45deg) translate(5px,5px)":open&&i===2?"rotate(-45deg) translate(5px,-5px)":"none",
            opacity:open&&i===1?0:1}}/>
        ))}
      </button>
      {open&&(
        <div style={{position:"absolute",top:"calc(100% + 8px)",left:0,minWidth:190,background:C.card,
          border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",boxShadow:"0 16px 48px #000c",
          animation:"menuIn .2s ease",zIndex:500}}>
          {/* User mini card */}
          <div style={{padding:"12px 14px",background:C.card2,borderBottom:`1px solid ${C.border}`,display:"flex",gap:10,alignItems:"center"}}>
            <Av ch={curUser?.avatar} size={32}/>
            <div>
              <div style={{color:C.text,fontWeight:700,fontSize:13}}>{curUser?.name}</div>
              <div style={{color:C.muted,fontSize:10}}>{curUser?.role==="admin"?"مشرف":"طالب"}</div>
            </div>
          </div>
          {items.map(it=>(
            <button key={it.p} onClick={()=>go(it.p)} className="ki-btn"
              style={{width:"100%",textAlign:"right",background:page===it.p?C.gold+"18":"transparent",
                color:page===it.p?C.gold:C.sub,border:"none",padding:"11px 14px",fontSize:13,
                display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${C.border}33`}}>
              <span>{it.icon}</span><span>{it.label}</span>
              {page===it.p&&<span style={{marginRight:"auto",color:C.gold,fontSize:10}}>●</span>}
            </button>
          ))}
          <button onClick={()=>{setOpen(false);confirm("هل أنت متأكد من تسجيل الخروج؟",onLogout);}} className="ki-btn"
            style={{width:"100%",textAlign:"right",background:"transparent",color:C.red,border:"none",
              padding:"11px 14px",fontSize:13,display:"flex",alignItems:"center",gap:10}}>
            <span>🚪</span><span>تسجيل الخروج</span>
          </button>
        </div>
      )}
    </div>
  );
};

/* ═════════════════════════════════════════════
   MAIN APP
═════════════════════════════════════════════ */
export default function App(){
  const [splash,  setSplash]  = useState(true);
  const [users,   setUsers]   = useState(initUsers);
  const [feed,    setFeed]    = useState(initFeed);
  const [me,      setMe]      = useState(null);
  const [page,    setPage]    = useState("login");
  const [selDay,  setSelDay]  = useState(null);
  const [adminTarget,setAdminTarget]=useState(null);
  const [notif,   setNotif]   = useState(null);
  const [confirmQ,setConfirmQ]=useState(null); // {msg,onYes}
  // auth
  const [lf,setLf]=useState({email:"",password:""});
  const [rf,setRf]=useState({name:"",email:"",password:"",confirm:"",phone:"",age:""});
  const [authErr,setAuthErr]=useState("");
  // edit
  const [ef,setEf]=useState({});
  // forum
  const [newTxt,setNewTxt]=useState("");
  const [cmtMap,setCmtMap]=useState({});
  const [openCmt,setOpenCmt]=useState({});
  // admin
  const [srch,setSrch]=useState("");

  const notify=(msg,type="ok")=>{setNotif({msg,type});setTimeout(()=>setNotif(null),3000);};
  const confirm=(msg,onYes)=>setConfirmQ({msg,onYes});
  const freshMe=()=>users.find(u=>u.id===me?.id)||me;

  // CSS
  useEffect(()=>{
    const s=document.createElement("style");
    s.textContent=`
      @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;}
      body{background:${C.bg};font-family:'Tajawal',sans-serif;direction:rtl;color:${C.text};}
      ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:${C.bg};}::-webkit-scrollbar-thumb{background:${C.gold}44;border-radius:2px;}
      @keyframes fu{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
      @keyframes spFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
      @keyframes spRing{0%{transform:scale(.9);opacity:.3;}50%{transform:scale(1.05);opacity:.6;}100%{transform:scale(.9);opacity:.3;}}
      @keyframes spDot{0%,100%{transform:scale(.5);opacity:.3;}50%{transform:scale(1.2);opacity:1;}}
      @keyframes cfIn{from{transform:scale(.9);opacity:0;}to{transform:scale(1);opacity:1;}}
      @keyframes menuIn{from{transform:translateY(-8px);opacity:0;}to{transform:translateY(0);opacity:1;}}
      @keyframes notif{0%{opacity:0;transform:translateX(-50%) translateY(-20px);}15%,80%{opacity:1;transform:translateX(-50%) translateY(0);}100%{opacity:0;transform:translateX(-50%) translateY(-20px);}}
      .fu{animation:fu .4s ease forwards;}
      .ki-btn{cursor:pointer;border:none;outline:none;font-family:'Tajawal',sans-serif;font-weight:700;transition:all .18s;border-radius:10px;}
      .ki-btn:hover{filter:brightness(1.1);transform:translateY(-1px);}
      .ki-btn:active{transform:scale(.97);}
      .ki-in{background:${C.card};border:1.5px solid ${C.border};color:${C.text};font-family:'Tajawal',sans-serif;border-radius:10px;padding:10px 14px;width:100%;outline:none;transition:border .2s;font-size:14px;}
      .ki-in:focus{border-color:${C.gold};box-shadow:0 0 0 3px ${C.gold}12;}
      .tr:hover{background:${C.gold}09!important;}
      .ch:hover{transform:translateY(-3px);box-shadow:0 8px 24px ${C.gold}12!important;transition:all .2s;}
    `;
    document.head.appendChild(s);
    return()=>document.head.removeChild(s);
  },[]);

  /* Auth */
  const login=()=>{
    const u=users.find(u=>u.email===lf.email&&u.password===lf.password);
    if(!u){setAuthErr("بيانات الدخول غير صحيحة");return;}
    setMe(u);setAuthErr("");setPage(u.role==="admin"?"admin":"home");notify(`أهلاً ${u.name} 🌙`);
  };
  const register=()=>{
    if(!rf.name||!rf.email||!rf.password){setAuthErr("يرجى ملء الحقول الإلزامية");return;}
    if(rf.password!==rf.confirm){setAuthErr("كلمتا المرور غير متطابقتين");return;}
    if(users.find(u=>u.email===rf.email)){setAuthErr("البريد مستخدم بالفعل");return;}
    const nu={id:Date.now(),name:rf.name,email:rf.email,password:rf.password,phone:rf.phone||"",age:rf.age||"",avatar:rf.name[0]||"؟",role:"student",joinDate:new Date().toISOString().split("T")[0],bio:"",progress:{},bonusPoints:0};
    setUsers(p=>[...p,nu]);setMe(nu);setAuthErr("");setPage("home