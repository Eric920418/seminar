--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Homebrew)
-- Dumped by pg_dump version 16.8 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Event; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Event" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    section1 jsonb NOT NULL
);


ALTER TABLE public."Event" OWNER TO admin;

--
-- Name: Event_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Event_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_id_seq" OWNER TO admin;

--
-- Name: Event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Event_id_seq" OWNED BY public."Event".id;


--
-- Name: ExhibitionPage; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."ExhibitionPage" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    section1 jsonb NOT NULL,
    section2 jsonb NOT NULL
);


ALTER TABLE public."ExhibitionPage" OWNER TO admin;

--
-- Name: ExhibitionPage_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."ExhibitionPage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ExhibitionPage_id_seq" OWNER TO admin;

--
-- Name: ExhibitionPage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."ExhibitionPage_id_seq" OWNED BY public."ExhibitionPage".id;


--
-- Name: ForumPage; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."ForumPage" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    section1 jsonb NOT NULL,
    section2 jsonb NOT NULL
);


ALTER TABLE public."ForumPage" OWNER TO admin;

--
-- Name: ForumPage_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."ForumPage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ForumPage_id_seq" OWNER TO admin;

--
-- Name: ForumPage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."ForumPage_id_seq" OWNED BY public."ForumPage".id;


--
-- Name: HomePage; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."HomePage" (
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    section1 jsonb NOT NULL,
    section2 jsonb NOT NULL,
    section3 jsonb NOT NULL,
    section4 jsonb NOT NULL,
    section5 jsonb NOT NULL,
    section6 jsonb NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public."HomePage" OWNER TO admin;

--
-- Name: HomePage_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."HomePage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."HomePage_id_seq" OWNER TO admin;

--
-- Name: HomePage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."HomePage_id_seq" OWNED BY public."HomePage".id;


--
-- Name: Host; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Host" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    section1 jsonb NOT NULL
);


ALTER TABLE public."Host" OWNER TO admin;

--
-- Name: Host_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Host_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Host_id_seq" OWNER TO admin;

--
-- Name: Host_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Host_id_seq" OWNED BY public."Host".id;


--
-- Name: MeetingPage; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."MeetingPage" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    section1 jsonb NOT NULL,
    section2 jsonb NOT NULL,
    section3 jsonb NOT NULL,
    section4 jsonb NOT NULL,
    section5 jsonb NOT NULL,
    section6 jsonb NOT NULL,
    section7 jsonb NOT NULL
);


ALTER TABLE public."MeetingPage" OWNER TO admin;

--
-- Name: MeetingPage_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."MeetingPage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MeetingPage_id_seq" OWNER TO admin;

--
-- Name: MeetingPage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."MeetingPage_id_seq" OWNED BY public."MeetingPage".id;


--
-- Name: PaperPage; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."PaperPage" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    section1 jsonb NOT NULL,
    section2 jsonb NOT NULL,
    section3 jsonb NOT NULL,
    section4 jsonb NOT NULL
);


ALTER TABLE public."PaperPage" OWNER TO admin;

--
-- Name: PaperPage_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."PaperPage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PaperPage_id_seq" OWNER TO admin;

--
-- Name: PaperPage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."PaperPage_id_seq" OWNED BY public."PaperPage".id;


--
-- Name: SpeechPage; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."SpeechPage" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    section1 jsonb NOT NULL,
    section2 jsonb NOT NULL
);


ALTER TABLE public."SpeechPage" OWNER TO admin;

--
-- Name: SpeechPage_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."SpeechPage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SpeechPage_id_seq" OWNER TO admin;

--
-- Name: SpeechPage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."SpeechPage_id_seq" OWNED BY public."SpeechPage".id;


--
-- Name: VideoPage; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."VideoPage" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    section1 jsonb NOT NULL
);


ALTER TABLE public."VideoPage" OWNER TO admin;

--
-- Name: VideoPage_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."VideoPage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."VideoPage_id_seq" OWNER TO admin;

--
-- Name: VideoPage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."VideoPage_id_seq" OWNED BY public."VideoPage".id;


--
-- Name: WorkshopPage; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."WorkshopPage" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    section1 jsonb NOT NULL,
    section2 jsonb NOT NULL
);


ALTER TABLE public."WorkshopPage" OWNER TO admin;

--
-- Name: WorkshopPage_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."WorkshopPage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."WorkshopPage_id_seq" OWNER TO admin;

--
-- Name: WorkshopPage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."WorkshopPage_id_seq" OWNED BY public."WorkshopPage".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO admin;

--
-- Name: Event id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Event" ALTER COLUMN id SET DEFAULT nextval('public."Event_id_seq"'::regclass);


--
-- Name: ExhibitionPage id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ExhibitionPage" ALTER COLUMN id SET DEFAULT nextval('public."ExhibitionPage_id_seq"'::regclass);


--
-- Name: ForumPage id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ForumPage" ALTER COLUMN id SET DEFAULT nextval('public."ForumPage_id_seq"'::regclass);


--
-- Name: HomePage id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."HomePage" ALTER COLUMN id SET DEFAULT nextval('public."HomePage_id_seq"'::regclass);


--
-- Name: Host id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Host" ALTER COLUMN id SET DEFAULT nextval('public."Host_id_seq"'::regclass);


--
-- Name: MeetingPage id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."MeetingPage" ALTER COLUMN id SET DEFAULT nextval('public."MeetingPage_id_seq"'::regclass);


--
-- Name: PaperPage id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."PaperPage" ALTER COLUMN id SET DEFAULT nextval('public."PaperPage_id_seq"'::regclass);


--
-- Name: SpeechPage id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."SpeechPage" ALTER COLUMN id SET DEFAULT nextval('public."SpeechPage_id_seq"'::regclass);


--
-- Name: VideoPage id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."VideoPage" ALTER COLUMN id SET DEFAULT nextval('public."VideoPage_id_seq"'::regclass);


--
-- Name: WorkshopPage id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."WorkshopPage" ALTER COLUMN id SET DEFAULT nextval('public."WorkshopPage_id_seq"'::regclass);


--
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Event" (id, "createdAt", "updatedAt", section1) FROM stdin;
1	2025-03-20 17:31:40.252	2025-03-20 17:31:40.252	{"editorCards": [{"id": "990723", "date": "3.10", "host": "李慧嬌 副教授 國立新竹教育大學 教育評量與課程設計系", "time": "11:45", "week": "星期五", "time2": "12:45", "title": "Keynote Speech I​", "isOpen": false, "people": ["李慧嬌", "Eric"], "person": "王大昌 助理研究員 國立中央大學 教師專業發展研究中心", "title2": "探討多元性別概念，擴展編審視野與深化知能～2024年審定本教科用書第4次專題研習", "content": "Key Drivers in Elementary and Secondary Teacher Education: Enhancement, Distinctiveness, and USR.", "abstract": "", "keywords": "", "location": "主題廣場"}]}
\.


--
-- Data for Name: ExhibitionPage; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."ExhibitionPage" (id, "createdAt", "updatedAt", section1, section2) FROM stdin;
2	2025-03-21 00:43:55.071	2025-03-21 00:43:55.071	{"card": [{"title": "作品展示 - 範例一", "images": ["/image/1742491414501-1112061.jpg", "/image/1742491434835-bonb.png"], "content": "這是一段作品的詳細描述。", "imageSrc": "/image/1742491099711-1112061.jpg", "developer": "開發者A", "introduce": "簡介：這是一個範例作品。"}, {"title": "作品展示 - 範例二", "images": [], "content": "這是另一段作品的詳細描述。", "imageSrc": "/images/example2.jpg", "developer": "開發者B", "introduce": "簡介：這是另一個範例作品。"}]}	{"card": [{"id": ["990723"], "date": "3.10"}, {"id": ["807457"], "date": "3.11"}]}
\.


--
-- Data for Name: ForumPage; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."ForumPage" (id, "createdAt", "updatedAt", section1, section2) FROM stdin;
1	2025-03-22 14:58:36.504	2025-03-22 14:58:36.504	{"dateLabel1": "師資培育教學實﻿踐計畫 圓桌論壇", "dateLabel2": "圓桌論壇（Round Table Forum）是一種強調平等參與與多元視角的討論形式，所有與會者皆圍坐於同一水準，藉此共享經驗、交流意見並激盪思維。 本次論壇結合師資培育暨藝術教育司之「領域教材教法教學實踐研究計畫」，以及高等教育司教學實踐中「職前師資培育」計畫，邀請在教材教法與教學實踐方面具創新性的研究主持人，以及師資培育大學之相關課程教師，共同探討師資培育政策、課程教學及數位科技應用等議題。研討會也將邀請歐盟區師範學院代表透過線上方式分享不同國家師資培育制度，增進國際交流並拓展研討範疇。透過此圓桌論壇之互動與對話，期望能提供更具前瞻性的師資培育策略與教學實踐參考。"}	{"card": [{"id": ["990723"], "date": "3.10"}]}
\.


--
-- Data for Name: HomePage; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."HomePage" ("createdAt", "updatedAt", section1, section2, section3, section4, section5, section6, id) FROM stdin;
2025-03-18 17:02:07.549	2025-03-18 17:02:07.549	{"title": {"left": "2025 ", "right": "ICTE"}, "content": "第十三屆師資培育國過學術研討會：\\n面對不確定未來的師資培育韌性", "location": "國立台北教育大學 至善樓國際會議廳", "subTitle": ["10.17", "FRI", "18", " SAT"]}	{"cards": [{"date": "03.10", "year": "2025", "content": "<p><span style=\\"color:rgb(37,47,56);font-family:NotoSansTC, sans-serif;font-size:20px;\\">論文主會議論文之審稿結果已於 3 月 10 日發布。</span><br><span style=\\"color:rgb(37,47,56);font-family:NotoSansTC, sans-serif;font-size:20px;\\">感謝整個程序委員會團隊、程式共同主席、助理主席以及所有審稿人的辛勤付出。</span></p>"}, {"date": "03.10", "year": "2025", "content": "<p><span style=\\"color:rgb(37,47,56);font-family:NotoSansTC, sans-serif;font-size:20px;\\">與會名單已公佈，</span><a target=\\"_blank\\" rel=\\"noopener noreferrer\\" href=\\"http://localhost:3000/success-list\\">詳見2025成功錄取名單。</a></p>"}]}	{"times": {"image": "/image/1742665860701-Banner.jpg", "time1": "2025/1/31 ~  ", "time2": "5/31", "time6": "2025/6/30", "time7": "2025/9/05", "time8": "2023/09/11~30", "dinner": "2025/10/17 19:00", "extend": ["2025/8/10 ", "2025/9/12", " 2025/8/27 "], "meeting": "2025/10/17~18"}}	{"images": "/image/1742665876469-Banner.jpg", "manualDownloadUrl": "https://tailwindcss.com/plus/ui-blocks/marketing/sections/contact-sections"}	{"videoUrl": "8x-QWJ8jswk"}	[{"主辦單位": "中華民國（台灣）教育部"}, {"承辦單位": "國立臺北教育大學課程與教學傳播科技研究所"}, {"協辦單位": "國立臺北教育大學師資培育處、國立臺北教育大學教育學院、臺灣教育傳播暨科技學會"}]	4
\.


--
-- Data for Name: Host; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Host" (id, "createdAt", "updatedAt", section1) FROM stdin;
1	2025-03-19 18:49:23.319	2025-03-19 18:49:23.319	{"editorCards": [{"name": "李慧嬌", "image": "/image/1742547944221-Banner.jpg", "isOpen": true, "school": "國立新竹教育大學\\n教育評量與課程設計系", "highest": "國立新竹教育大學 教育評量與課程設計系 副教授\\n美國 Portland State University 科技管理博士 美國", "interests": "教育、媒體與社會、媒體素養、學習與績效評估、教育傳播", "experience": "教育部｜政務次長\\n國立台北教育大學｜師資培育中心教授\\n國立台北教育大學｜事務長\\n台北市教育局｜教育局副局長​​​"}, {"name": "Eric", "image": "", "isOpen": true, "school": "元智大學", "highest": "元智大學", "interests": "code", "experience": "目前沒有"}]}
\.


--
-- Data for Name: MeetingPage; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."MeetingPage" (id, "createdAt", "updatedAt", section1, section2, section3, section4, section5, section6, section7) FROM stdin;
1	2025-03-22 16:28:06.887	2025-03-22 16:28:06.887	{"list": [{"date": "3.10", "content": "<p>5t5g5</p>"}, {"date": "3.11", "content": "<p>wwwww</p>"}]}	{"times": {"time1": "efe", "time2": "111111", "time6": "efef", "time7": "efef", "time8": "fe", "dinner": "fef", "extend": ["ererge", "ef", "efef"], "meeting": "fe"}}	{"time1": "一、 主持人開場：10分鐘。\\n二、與談人發表時間：各20分鐘，共40分鐘。\\n三、來賓及與談人Q&A時間：10分鐘。", "time2": "一、主持人開場：5分鐘。\\n二、主講人發表時間：40分鐘。\\n三​、來賓與主講人Q&A時間：5分鐘。", "time3": "一、主持人開場時間：3分鐘（含播放議事規則影片）。\\n二​、各主題發表時間20分鐘，於19分鐘按一聲短鈴，於20分鐘按一聲長鈴提醒並結束發表。\\n三、​ 最後由主持人帶領討論Q&A，時間5分鐘。\\n四、若該場次發表4篇，則各主題發表時間15分鐘，於14分鐘按一聲短鈴，於15分鐘按一聲長鈴提醒並結束發表。\\n五、主持人可視需求彈性延長各篇發表及討論時間。", "time4": "一、由主講老師自行分配。\\n二​​​、中間穿插20分鐘休息時間。", "time5": "一、主持人時間：10分鐘。\\n二、主講人時間：各20分鐘，共80分鐘。\\n三、最後由主持人帶Q&A，時間10分鐘。", "content1": "各場次皆為60分鐘", "content2": "各場次皆為50分鐘", "content3": "每場次3-4篇，60-80分鐘", "content4": "各場次皆為140分鐘（含休息）", "content5": "100分鐘"}	{"url": "https://tailwindcss.com/plus/ui-blocks/marketing/sections/contact-sections", "form": "全部場次已額滿，​線上報名​已截止，亦不接受現場報名。若有報名可查看報名成功名單。​", "date1": "2025／10／16", "date2": "2025／10／16", "content": "感謝您對本研討會的支持與關注！如果您有意參加，請先填寫以下的 Google 線上報名表單，當報名截止時可查看一般與會者 報名成功名單（按照姓氏筆畫排列，電話末三碼為確認身分用，如有同名者可用電話末三碼加以區分）。 本研討會不接受現場報名，將以報名資訊確認信中的 QR code為報到依據。本研討會不收取任何費用，誠摯邀請您踴躍報名，期待在活動現場與您相見。"}	{"location": "國立臺北教育大學至善樓國際會議廳"}	[{"map": "10644 台北市大安區和平東路一段147號", "url": "https://www.moxytaichung.com/", "form": "https://bit.ly/4cvFmAp", "image": "/image/1742660183691-img.png", "phone": "+886-4-3600-7000", "title": "台北福華大飯店", "content": "走路​​到國立台北教育大學只要8分鐘！", "location": "10644 台北市大安區和平東路一段147號"}, {"map": "10644 台北市大安區和平東路一段147號", "url": "https://www.moxytaichung.com/", "form": "https://bit.ly/4cvFmAp", "image": "/image/1742660190521-img2.png", "phone": "+886-4-3600-7000", "title": "台北福華大飯店", "content": "走路​​到國立台北教育大學只要8分鐘！", "location": "10644 台北市大安區和平東路一段147號"}, {"map": "10644 台北市大安區和平東路一段147號", "url": "https://www.moxytaichung.com/", "form": "https://bit.ly/4cvFmAp", "image": "/image/1742660197562-img3.png", "phone": "+886-4-3600-7000", "title": "台北福華大飯店", "content": "走路​​到國立台北教育大學只要8分鐘！", "location": "10644 台北市大安區和平東路一段147號"}]	{"MapUrl": "/image/1742719170499-Rectangle-235.png"}
\.


--
-- Data for Name: PaperPage; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."PaperPage" (id, "createdAt", "updatedAt", section1, section2, section3, section4) FROM stdin;
1	2025-03-19 19:34:46.585	2025-03-19 19:34:46.585	{"tab": [{"card": [{"title": "謝宜晏、﻿李姿涵​", "videos": "From Perception to Action: A Study on Enhancing Sustainable Quality of Life among Rural Residents in Hualien County, Taiwan.", "content": "從認知到行動：提升台灣花蓮縣偏鄉地區居民永續生活品質之研究", "EnContent": "From Perception to Action: A Study on Enhancing Sustainable Quality of Life among Rural Residents in Hualien County, Taiwan."}]}, {"card": [{"title": "謝宜晏、﻿李姿涵​", "content": "從認知到行動：提升台灣花蓮縣偏鄉地區居民永續生活品質之研究", "EnContent": "From Perception to Action: A Study on Enhancing Sustainable Quality of Life among Rural Residents in Hualien County, Taiwan."}]}]}	{"dataA": "(一) 截稿日期：2025年6月7日（星期五） 23:59 止\\n(二) 摘要字數（中、英文摘要並陳）：中文摘要字數1000字以內，英文摘要字數600字以內\\n(三) 摘要內容（可視發表主題彈性修改）：\\n        1. 論文題目\\n        2. 研究動機、目的（或教學源起）\\n        3. 研究方法（或教學方法）\\n        4. 研究結果（或教學成效）\\n        5. 研究貢獻及建議（或未來展望）\\n        6. 關鍵字(3-5個)", "text1": "聯絡人：國立臺北教育大學師資培育中心\\n專案助理 聯繫方式：08-7663800\\n轉 22104 E-mail︰nptuicte12@gmail.com", "content1": "(二) 口頭發表者，請於2025年9月6日(星期五)23:59前上傳簡報檔。簡報檔相關規定詳見", "content2": "https://tailwindcss.com/plus/ui-blocks/marketing/sections/contact-sections", "content3": "(三) 海報發表者，請於2025年8月16日(星期五)23:59前上傳繳交海報全文PDF檔，並於2025年9月6日(星期五)前以掛號寄至（或親自送交）國立屏東大學師資培育中心。海報檔相關規定詳見", "content4": "https://tailwindcss.com/plus/ui-blocks/marketing/sections/contact-sections", "content5": "(四) 簽署論文授權書及個人基本資料（姓名、學歷、現職、地址、電話、傳真或電子郵件信箱）等，授權書請見", "content6": "https://tailwindcss.com/plus/ui-blocks/marketing/sections/contact-sections", "content7": "(五) 文責版權：論文需未曾發表於其他研討會或期刊。論文經錄取後，稿件作者須無條件授權本研討會以紙本、光碟、微縮或其他數位化方式重製宣傳或上載研討會網站供參與者下載。", "content8": "<p><span style=\\"background-color:rgb(255,255,255);color:rgb(37,47,56);font-family:NotoSansTC, sans-serif;font-size:15px;\\">國內外學者專家、教學現場教師或相關系所研究生，</span><span style=\\"background-color:rgb(255,255,255);color:var(--color-primary);font-family:NotoSansTC, sans-serif;font-size:15px;\\">免報名費！</span></p>", "dataArea": "(一)凡通過審查者，請於2025年7月5日(星期五)23:59前送交修正後論文摘要（根據審查意見修改）", "dataDate": "https://tailwindcss.com/plus/ui-blocks/marketing/sections/contact-sections", "dataLink1": "https://tailwindcss.com/plus/ui-blocks/marketing/sections/contact-sections", "dataLink2": "https://tailwindcss.com/plus/ui-blocks/marketing/sections/contact-sections", "dataLink3": "https://tailwindcss.com/plus/ui-blocks/marketing/sections/contact-sections", "dataText2": "聚焦於本次研討會的主軸「師資培育的關鍵驅動力：精進 x 特色 x 師培USR」，本研討會的徵稿子題如下：", "dataText3": "一、師資培育精進／特色／師培USR的學理基礎\\n二、師資培育精進／特色／師培USR與教師專業成長\\n三、師資培育精進／特色／師培USR與區域網絡建置\\n四、師資培育精進／特色／師培USR的場域協作模式\\n五、師資培育精進／特色／師培USR的課程與教學\\n六、師資培育精進／特色／師培USR的實踐研究\\n七、師資培育精進／特色／師培USR與偏鄉教育\\n八、師資培育精進／特色／師培USR與永續教育\\n九、師資培育精進／特色／師培USR與社會實踐\\n十、師資培育精進／特色／師培USR的成效評估機制\\n十一、其他與師資培育有關的議題\\n（如：教育實習，教學實習，師資培育政策，領域教材教法等相關議題）", "dataCKEdit": "2024年6月21日（星期五）17時前以E-mail郵件通知（屆時請留意信箱訊息），並同步公布於國立屏東大學師資培育中心網站", "dataQrCode": "https://tailwindcss.com/plus/ui-blocks/marketing/sections/contact-sections", "dataContent1": "(一)領域教材教法研究學術論文獎獲獎論文發表 結合師資培育暨藝術教育司辦理之領域教材教法研究學術論文獎 勵計畫，年度獲獎論文共 9 件，邀請進行學術論文發表，期能提升 各領域教材教法研究質量，並促進師資培育之大學高品質學術研究 交流。 (二)師資培育與領域教材教法論文發表 以公開徵稿及邀稿之方式，徵求與研討會議題相關之論文，進行口 頭或海報(書面)發表與分享，會後彙整具實務應用與參考價值之 研究論文成果，供相關領域(群科)教學研究中心以及各師培大學 教材教法課程參考。"}	{"card": [{"id": "李慧嬌", "title": "title", "content": "title"}]}	{"card": [{"id": "口頭發表", "title": "eric", "content": "eric"}]}
\.


--
-- Data for Name: SpeechPage; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."SpeechPage" (id, "createdAt", "updatedAt", section1, section2) FROM stdin;
1	2025-03-22 14:32:12.538	2025-03-22 14:32:12.538	{"dateLabel1": "教材教法創新與師資培育交流論壇", "dateLabel2": "預定邀請國內外對教材教法素有專精之學者數名，除了探討不同國家 之師資培育制度特色、重要政策以及當前整體師資培育所面臨的挑戰 等面向，同時探討應用於各領域之 PBL、現象本位、AI 教育及跨領域 教學學習等創新教學方法，進而瞭解當前國際趨勢下的師資培育變革 趨勢，以及教材教法創新與實踐，促進學術交流與師資培育合作。"}	{"card": [{"id": ["990723"], "date": "3.10"}]}
\.


--
-- Data for Name: VideoPage; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."VideoPage" (id, "createdAt", "updatedAt", section1) FROM stdin;
1	2025-03-19 10:11:44.237	2025-03-19 10:11:44.237	{"tab": [{"cards": [{"title": "教育應該不一樣從全球化到在地化", "videos": "O4_yQW9VNxY", "content": "楊志敏副教授｜國立屏東大學 師資培育中心"}, {"title": "第二個影片標題", "videos": "SecondVideoID", "content": "這是第二個影片的內容"}], "video": "editorVideoURL"}, {"cards": [{"title": "第三個影片標題", "videos": "ThirdVideoID", "content": "這是第三個影片的內容"}], "video": "editorVideoURL2"}]}
\.


--
-- Data for Name: WorkshopPage; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."WorkshopPage" (id, "createdAt", "updatedAt", section1, section2) FROM stdin;
1	2025-03-21 17:34:16.966	2025-03-21 17:34:16.966	{"dateLabel1": "素養導向﻿教學方法創新應用嘉年華", "dateLabel2": "整合現場教學專家教師、國內知名創新教育或具備實務經驗之講師、 師培大學相關科系，以及各大領域教學研究中心等師資培育課程教學 投入者，針對未來教師教學所需之跨領域素養導向課程發展、教學設 計與學習評量等知能(例如概念為本教學、現象本位教學、DFC 教學、 AI-pedagogy、數位平臺應用與多元評量、探究與實作......)，分別提 供不同角度提出創新教學理念與實作之分享嘉年華，期能更強化教材 教法研究與教學之影響與效益。另外，也預計邀請師資培育教學實踐 相關優良計畫之授課教師及師資生，分享其教學理念設計以及師資生 學習參與，或安排場次邀請師資生發表參與師資培育課程或教育實踐 研究之經驗反思。"}	{"card": [{"id": ["990723"], "date": "3.10"}]}
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
6dcb8345-016e-4675-a8eb-ac80c04b5951	38d1f94a36506afee4097e747d87e7263964ca709db5a5f921a2e3fc7cba5b9d	2025-03-18 15:10:45.638992+08	20250318071045_init	\N	\N	2025-03-18 15:10:45.628152+08	1
df6e1b5d-2418-45d6-8eb6-bc9078e1fc1d	8392ae69bcc80b7840087f3f5cb01e987d677e0c986bfe5af37849c77ba5bd02	2025-03-18 15:45:18.341039+08	20250318074518_update	\N	\N	2025-03-18 15:45:18.334937+08	1
bfafdc54-2f65-4c36-ada3-621340ebd8ea	dc8ee721730ec56497d8b2c8a00e7474c4202e8c7754f3335a8d0ed205af688d	2025-03-18 16:11:59.393698+08	20250318081159_update	\N	\N	2025-03-18 16:11:59.390212+08	1
dbbe743d-aa6a-4aed-b0d1-cb63507d14a8	c2a28fb86aee3b85418e479bfc05f02f2128229cf2799dea2528de08be00e5bf	2025-03-19 09:54:43.707265+08	20250319015443_update	\N	\N	2025-03-19 09:54:43.701914+08	1
dcdcd702-bae8-48cd-a914-3305b9bdd6bd	3a7ea49d649220eb085cac3bcf7b1549959185ee724dde915e24484f07d2c7c3	2025-03-19 16:21:50.007826+08	20250319082149_update	\N	\N	2025-03-19 16:21:50.001098+08	1
c77f82c9-d4a5-4d87-a013-f94df549d9d7	780ca0000af6820ffeee9fe62909fc98fe9dc09f7489f0217ab7b02675cb8952	2025-03-19 17:16:08.923684+08	20250319091608_update	\N	\N	2025-03-19 17:16:08.914758+08	1
25be766d-a364-4db6-9614-116cc7bb2071	52aa49da4a63fa1654ab5d6fc4be513fd198c4d78fc7d01758f1558567ffde74	2025-03-19 18:48:23.533023+08	20250319104823_update	\N	\N	2025-03-19 18:48:23.523+08	1
d2bba255-0486-4cf4-955d-48920cc72149	be516c57183bcfde024b500e6cacb306d5b9f26e69ca982db6f5d6f4c367bda3	2025-03-20 17:12:06.824209+08	20250320091206_update	\N	\N	2025-03-20 17:12:06.816435+08	1
954657f2-fc65-4075-8e9c-f4576de1fd3c	11ec5fe1d5e7c2521f6eeb90a9cf2d305edd3fed92dd7cc66cec9148d52c50ab	2025-03-20 17:21:28.017562+08	20250320092128_update	\N	\N	2025-03-20 17:21:28.00936+08	1
3e08523a-d9f5-435a-a5a4-9f001c0458c3	c536a7ebe900a58aa2ccc4d2a73318119c56c3a1882fe6f9523f9c1d2711271c	2025-03-21 17:17:18.37272+08	20250321091718_update	\N	\N	2025-03-21 17:17:18.365936+08	1
6200d76f-d66b-431f-93e4-32a8b88b424d	494d7b76520d683e6324cb39ccfea9915022b2d3759cffa47b8f06a715c44a2e	2025-03-22 14:29:50.463957+08	20250322062950_update	\N	\N	2025-03-22 14:29:50.456646+08	1
ddf10122-d60d-4bb1-8d01-b4173d09cb6c	e96120b4c86d2558dd2c12eb9f86405fe5d49f0154a6b450ff1fe8593d7a0738	2025-03-22 14:57:14.7505+08	20250322065714_update	\N	\N	2025-03-22 14:57:14.744606+08	1
19925341-ce4f-457d-a406-04558882ee5d	d2feca380e7a03d3673ee7d912bd428b7c3944459af1510c6c6ca8bcecc64a1c	2025-03-22 15:19:34.759836+08	20250322071934_update	\N	\N	2025-03-22 15:19:34.753355+08	1
\.


--
-- Name: Event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Event_id_seq"', 1, true);


--
-- Name: ExhibitionPage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."ExhibitionPage_id_seq"', 2, true);


--
-- Name: ForumPage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."ForumPage_id_seq"', 1, true);


--
-- Name: HomePage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."HomePage_id_seq"', 4, true);


--
-- Name: Host_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Host_id_seq"', 1, true);


--
-- Name: MeetingPage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."MeetingPage_id_seq"', 1, true);


--
-- Name: PaperPage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."PaperPage_id_seq"', 1, true);


--
-- Name: SpeechPage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."SpeechPage_id_seq"', 1, true);


--
-- Name: VideoPage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."VideoPage_id_seq"', 1, true);


--
-- Name: WorkshopPage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."WorkshopPage_id_seq"', 1, true);


--
-- Name: Event Event_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);


--
-- Name: ExhibitionPage ExhibitionPage_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ExhibitionPage"
    ADD CONSTRAINT "ExhibitionPage_pkey" PRIMARY KEY (id);


--
-- Name: ForumPage ForumPage_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ForumPage"
    ADD CONSTRAINT "ForumPage_pkey" PRIMARY KEY (id);


--
-- Name: HomePage HomePage_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."HomePage"
    ADD CONSTRAINT "HomePage_pkey" PRIMARY KEY (id);


--
-- Name: Host Host_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Host"
    ADD CONSTRAINT "Host_pkey" PRIMARY KEY (id);


--
-- Name: MeetingPage MeetingPage_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."MeetingPage"
    ADD CONSTRAINT "MeetingPage_pkey" PRIMARY KEY (id);


--
-- Name: PaperPage PaperPage_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."PaperPage"
    ADD CONSTRAINT "PaperPage_pkey" PRIMARY KEY (id);


--
-- Name: SpeechPage SpeechPage_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."SpeechPage"
    ADD CONSTRAINT "SpeechPage_pkey" PRIMARY KEY (id);


--
-- Name: VideoPage VideoPage_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."VideoPage"
    ADD CONSTRAINT "VideoPage_pkey" PRIMARY KEY (id);


--
-- Name: WorkshopPage WorkshopPage_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."WorkshopPage"
    ADD CONSTRAINT "WorkshopPage_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

