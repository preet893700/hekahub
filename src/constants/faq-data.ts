export interface FAQItem {
  id: string;
  group: 'global' | 'local';
  label: string;
  keywords: string[];
  question: string;
  answer: string;
}

export const faqMap: FAQItem[] = [
  {
    id: 'pricing-plans',
    group: 'global',
    label: 'Pricing & Plans',
    keywords: [
      // Core pricing
      'pricing',
      'price',
      'prices',
      'cost',
      'costs',
      'how much',
      'how much does it cost',
      'how much is it',
      'how much does hekahub cost',
      'what is the cost',
      'what is the price',
      'tuition',
      'charges',

      // Plans
      'subscription',
      'subscriptions',
      'packages',
      'package',
      'options',
      'tiers',
      'what plans are available',
      'what packages do you offer',
      'what are the plans',

      // Early bird / discounts
      'early bird',
      'early bird discount',
      'discount',
      'discounts',
      'promo',
      'promo code',
      'coupon',
      'offer',
      'sale',
      'deal',
      'special offer',
      'reduced price',
      'cheaper option',
      'affordable',
      'is it affordable',

      // Per class / per session
      'per class',
      'per session',
      'class price',
      'session price',
      'how much per class',
      'individual class',
      'single class',
      'pay per class',

      // Batch types
      'batch options',
      'which batch',
      'weekday or weekend',

      // Bootcamp pricing specifically
      'bootcamp cost',
      'bootcamp price',
      'how much is the bootcamp',
      'bootcamp fee',
      'bootcamp pricing',
      '$600',
      '600 dollars',

      // Payment
      'payment',
      'payment options',
      'how to pay',
      'payment methods',
      'can i pay monthly',
      'installment',
      'emi',
      'refund',
      'refund policy',
      'money back',
      'pricing plans',
      'what are the plans',
      'available plans',
      'weekday batch price',
      'weekend batch price',
      'bootcamp price',
      'membership price',
    ],
    question: 'What are the pricing plans?',
    answer:
      'We have 4 plans — all include a certificate, reward kit, revision classes & weekly newsletter:\n\n- **Summer Bootcamp** — $25/class · $100/week · $350/month · **$600/bootcamp** (Early Bird, was $1,999)\n- **Weekday Batch** — **$59.99/month** (52 weeks, 240 classes × 45 min)\n- **Weekend Batch** — **$59.99/month** (52 weeks, 80 classes × 2 hrs)\n- **Annual Membership** — **$1,100/year** (Early Bird, was $4,999) — all bootcamps + 320+ hrs + guest sessions + welcome gift\n\nAll plans have a **$99 registration fee**. Group/school bookings? [Let\'s talk!]',
  },

  {
    id: 'what-is-hekahub',
    group: 'global',
    label: 'About HekaHub',
    keywords: [
      // Direct name queries
      'what is hekahub',
      'what is heka hub',
      'about hekahub',
      'about heka hub',
      'hekahub meaning',
      'what does hekahub mean',
      'what does heka mean',
      'heka meaning',

      // Identity / who are you
      'who are you',
      'who is this',
      'who made this',
      'who built this',
      'who created hekahub',
      'what are you',
      'tell me about yourself',
      'tell me about hekahub',
      'explain hekahub',
      'describe hekahub',
      'what do you do',
      'what does hekahub do',
      'what does hekahub offer',
      'what is this platform',
      'what is this website',
      'what is this app',

      // Purpose / mission
      'what is hekahub about',
      'what is the purpose of hekahub',
      'hekahub mission',
      'hekahub vision',
      'hekahub goal',
      'what does hekahub teach',
      'what can i learn on hekahub',
      'is hekahub an ai school',
      'is hekahub a coding school',
      'is hekahub a learning platform',
      'is this an edtech platform',
      'edtech for kids',
      'ai learning for kids',
      'learning platform for kids',

      // Audience curiosity
      'who is hekahub for',
      'is hekahub for me',
      'is this for students',
      'is this for children',
      'is this for teens',

      // Typos / alternate spellings
      'heka-hub',
      'hekah ub',
      'heka hb',
    ],
    question: 'What is HekaHub?',
    answer:
      'HekaHub is an AI-powered learning ecosystem designed for innovators of all skill levels—from **Kids and Teens** to **College Students and Professionals**. Powered by **Hekaos**, we bridge the gap between curiosity and creation, teaching learners not just how to use AI, but how to engineer intelligence.',
  },

  {
    id: 'summer-bootcamp',
    group: 'global',
    label: 'Summer Bootcamp',
    keywords: [
      // Core terms
      'summer bootcamp',
      'bootcamp',
      'boot camp',
      'summer boot camp',
      'summer program',
      'summer course',
      'summer class',
      'summer training',
      'summer camp',
      'ai summer camp',
      'coding summer camp',
      'ai bootcamp',
      'coding bootcamp',
      'tech bootcamp',

      // Duration related
      '8 weeks',
      'eight weeks',
      '8 week program',
      '8-week',
      '8 week course',
      'how long is bootcamp',
      'how long is the program',
      'how many weeks',
      'duration of bootcamp',

      // Content related
      'intensive program',
      'intensive course',
      'immersive program',
      '160 hours',
      '40 classes',
      'how many classes',
      'how many sessions',
      'what happens in bootcamp',
      'what is included in bootcamp',
      'what do you learn in bootcamp',
      'what will my child learn',
      'bootcamp curriculum',
      'bootcamp syllabus',
      'bootcamp schedule',
      'bootcamp content',

      // Registration / interest
      'tell me about the bootcamp',
      'tell me about summer bootcamp',
      'summer bootcamp details',
      'bootcamp details',
      'join bootcamp',
      'enroll in bootcamp',
      'sign up for bootcamp',
      'register for bootcamp',
      'how to join bootcamp',
      'how to enroll',
      'bootcamp enrollment',
      'bootcamp registration',
      'is bootcamp open',
      'when does bootcamp start',
      'bootcamp start date',
      'bootcamp dates',
      'when is bootcamp',

      // Reward / outcome
      'bootcamp reward',
      'bootcamp completion',
      'what do you get after bootcamp',
      'bootcamp kit',
      'completion kit',
      'completion kit',
      'reward kit',
      '20 projects',
      'twenty projects',
      'how many projects',
      'real world projects',
      'portfolio projects',
    ],
    question: 'Tell me about the Summer Bootcamp.',
    answer:
      'The Summer Bootcamp is an intensive **8-week** AI deep-dive designed for fast-paced learning:\n\n- **160+ hours** of immersive sessions\n- **40 classes**, each 4 hours long\n- Revision classes + curated newsletters\n- Physical **completion reward kit** + certificate\n- Free trial classes available on request\n\n**Price:** $600 Early Bird *(was $1,999)* · or pay $25/class, $100/week, $350/month. Registration fee: $99.',
  },

  {
    id: 'target-audience',
    group: 'global',
    label: 'Target Audience',
    keywords: [
      // Direct audience queries
      'who is this for',
      'who can join',
      'target audience',
      'kids',
      'teens',
      'college students',
      'university students',
      'professionals',
      'adults',
      'working professionals',
      'seniors',
      'everyone',
      'age group',
      'ages',
      'all ages',
      'skill level',
    ],
    question: 'Who is HekaHub for?',
    answer:
      'HekaHub is designed for curious minds at every stage of their journey. Our programs are tailored for **Kids (10+), Teens, College Students, and Working Professionals** who want to master AI and build real-world products.',
  },

  {
    id: 'prerequisites',
    group: 'local',
    label: 'Prerequisites',
    keywords: [
      // Direct prerequisite queries
      'prerequisites',
      'prerequisite',
      'requirements',
      'requirement',
      'do i need coding',
      'do i need to know coding',
      'do i need prior experience',
      'prior experience',
      'prior knowledge',
      'background',
      'background required',
      'coding background',
      'tech background',
      'level',
      'skill level',
      'what level',
      'experience level',

      // Beginner questions
      'beginner',
      'beginners',
      'complete beginner',
      'total beginner',
      'zero experience',
      'no experience',
      'no coding experience',
      'no prior coding',
      'no background',
      'is it for beginners',
      'can a beginner join',
      'i have no coding experience',
      'my child has no experience',
      'first time learner',
      'new to coding',
      'new to programming',
      'new to ai',
      'never coded before',
      'never programmed before',
      'from scratch',
      'starting from zero',
      'starting from scratch',

      // Coding / programming specific
      'do i need to know programming',
      'do i need to know python',
      'programming experience',
      'python experience',
      'coding skills',
      'coding knowledge',
      'is coding required',
      'is programming required',

      // Equipment / setup
      'what do i need',
      'what equipment do i need',
      'laptop',
      'do i need a laptop',
      'computer',
      'do i need a computer',
      'device',
      'what device',
      'internet',
      'internet connection',
      'wifi',
      'stable internet',
      'do i need wifi',
      'technical requirements',
      'setup requirements',
      'system requirements',

      // Readiness / eligibility
      'am i eligible',
      'can i join',
      'is my child eligible',
      'can my child join',
      'is hekahub suitable for beginners',
      'will my child cope',
      'is it too hard',
      'is it difficult',
      'how hard is it',
      'difficulty level',
      'is it easy',
    ],
    question: 'Do I need prior coding experience or are there any prerequisites?',
    answer:
      'No prior coding experience is required! We start from first principles. Our curriculum is designed to be accessible for beginners while providing deep engineering insights for advanced learners. All you need is a laptop, stable internet, and a curious mind.',
  },

  {
    id: 'certificates',
    group: 'local',
    label: 'HekaHub Certificate',
    keywords: [
      'certificate',
      'certificates',
      'certification',
      'certifications',
      'certified',
      'zero cost',
      'do i get a certificate',
      'will i get a certificate',
      'is there a certificate',
      'completion certificate',
      'course certificate',
      'program certificate',
      'hekahub certificate',

      // Diploma / credential
      'diploma',
      'degree',
      'credential',
      'credentials',
      'accreditation',
      'accredited',
      'is it accredited',
      'recognized certificate',
      'official certificate',

      // Proof of completion
      'proof of completion',
      'completion',
      'completed',
      'course completion',
      'bootcamp completion',
      'what happens after i complete',
      'after finishing the course',
      'after completing bootcamp',
      'end of program',
      'end of course',

      // Reward / physical kit
      'reward',
      'rewards',
      'reward kit',
      'completion kit',
      'kit',
      'physical reward',
      'physical kit',
      'what do i get',
      'what do i receive',
      'what do graduates get',
      'bootcamp graduates',
      'graduation',
      'do i graduate',
      'graduate',

      // Value of certificate
      'is the certificate useful',
      'is the certificate recognized',
      'certificate value',
      'will it help my resume',
      'resume',
      'portfolio',
      'badge',
      'digital badge',
      'linkedin certificate',
      'add to linkedin',
    ],
    question: 'Will I get a certificate of completion?',
    answer:
      'Yes! Every learner who completes our program receives the official **HekaHub Certificate**. This certificate recognizes your technical mastery and ability to build engineered intelligence solutions. Bootcamp graduates also receive a physical reward kit.',
  },

  // ─── PRICING DEEP-DIVES ───────────────────────────────────────────────────

  {
    id: 'annual-membership',
    group: 'global',
    label: 'Annual Membership',
    keywords: [
      'annual membership', 'annual plan', 'yearly plan', 'yearly membership',
      'full year', 'all year', 'year long', '1 year', 'one year',
      'annual price', 'annual cost', 'how much is annual', 'annual fee',
      '1100', '$1100', '1100 dollars', 'annual early bird',
      'all bootcamps', 'all seasons', 'every bootcamp',
      '320 hours', '320+ hours',
      'crash course library', 'library access', 'course library',
      'guest sessions', 'guest expert', 'live sessions', 'expert sessions',
      'infographics', 'ai infographics', 'brain first',
      'welcome gift', 'enrollment gift', 'welcome kit',
      'best plan', 'most value', 'best value plan', 'recommended plan',
      'is annual worth it', 'should i get annual',
    ],
    question: 'What does the Annual Membership include?',
    answer:
      '**Annual Membership** — the all-in plan for learners who never stop:\n\n- All seasonal bootcamps included\n- **320+ hours** of AI learning\n- Crash Course Library access\n- Live guest expert sessions\n- Brain-first AI infographics\n- Revision classes + weekly newsletter\n- Certificate + completion reward kit\n- Exclusive welcome enrollment gift\n\n**Price:** $1,100/year *(Early Bird, was $4,999)* + $99 registration fee.',
  },

  {
    id: 'weekday-batch',
    group: 'global',
    label: 'Weekday Batch',
    keywords: [
      'weekday batch', 'weekday plan', 'weekday classes', 'weekday schedule',
      'school days', 'monday to friday', 'mon to fri', 'weekdays only',
      'weekday program', 'weekday sessions',
      'how many weekday classes', 'weekday class duration', '45 minutes', '45 min class',
      '240 classes', '52 weeks weekday',
      '$59.99', '59.99', '59 per month', 'monthly weekday',
      'is weekday right for me', 'weekday vs weekend',
      'fits school schedule', 'school schedule plan',
    ],
    question: 'What is the Weekday Batch?',
    answer:
      "The **Weekday Batch** is designed to fit into your professional or academic routine:\n\n- **52 weeks** of AI mastery\n- **240 classes**, each 45 minutes\n- 160+ hours of engineered intelligence content\n- Revision sessions + curated newsletter\n- Certificate + completion reward kit\n- Free trial classes on request\n\n**Price:** $59.99/month + $99 registration fee.",
  },

  {
    id: 'weekend-batch',
    group: 'global',
    label: 'Weekend Batch',
    keywords: [
      'weekend batch', 'weekend plan', 'weekend classes', 'weekend schedule',
      'saturday sunday', 'saturday class', 'sunday class', 'weekends only',
      'weekend program', 'weekend sessions', 'weekend learning',
      'how many weekend classes', 'weekend class duration', '2 hours', '2 hour class',
      '80 classes', '52 weeks weekend',
      'deep dive weekend', 'intensive weekend',
      'is weekend right for me', 'weekday vs weekend',
      '$59.99 weekend', '59.99 weekend', 'monthly weekend',
    ],
    question: 'What is the Weekend Batch?',
    answer:
      'The **Weekend Batch** is for deep-dive learners:\n\n- **52 weeks** of AI learning\n- **80 classes**, each 2 hours long\n- 160+ hours of immersive content\n- Revision classes + weekly newsletter\n- Certificate + completion reward kit\n- Free trial classes on request\n\n**Price:** $59.99/month + $99 registration fee.',
  },

  {
    id: 'registration-fee',
    group: 'global',
    label: 'Registration Fee',
    keywords: [
      'registration fee', 'registration cost', 'registration charge',
      'signup fee', 'sign up fee', 'joining fee', 'onboarding fee',
      '$99', '99 dollars', '99 fee',
      'is there a registration fee', 'do i pay a registration fee',
      'what is the registration fee', 'why is there a registration fee',
      'additional fee', 'extra fee', 'hidden fee', 'hidden cost',
      'total cost', 'total price', 'all in cost',
    ],
    question: 'Is there a registration fee?',
    answer:
      'Yes — all plans have a one-time **$99 registration fee** on top of the plan price. This covers your onboarding, account setup, and welcome materials.',
  },

  {
    id: 'free-trial',
    group: 'global',
    label: 'Free Trial',
    keywords: [
      'free trial', 'trial class', 'free class', 'demo class', 'sample class',
      'try before buying', 'can i try first', 'free session', 'trial session',
      'is there a free trial', 'do you offer a trial',
      'test the class', 'try a class', 'first class free',
      'before enrolling', 'before i enroll', 'before signing up',
    ],
    question: 'Can I try a class before enrolling?',
    answer:
      "Yes! Free trial classes are available **upon request** for all batches. Experience our hands-on teaching style and see how AI can transform your workflow or studies before you commit.",
  },

  {
    id: 'group-booking',
    group: 'global',
    label: 'Group / School Bookings',
    keywords: [
      'group booking', 'group plan', 'school booking', 'school plan',
      'school', 'schools', 'group', 'groups', 'bookings',
      'organisation', 'organization', 'cohort', 'bulk booking',
      'bulk enrollment', 'team enrollment', 'multiple students',
      'school program', 'school partnership', 'institutional plan',
      'custom plan', 'custom pricing', 'bespoke plan',
      'corporate', 'nonprofit', 'ngo',
      'can a school join', 'can my school enroll', 'school discount',
      'group discount', 'bulk discount',
      "let's talk", 'contact for pricing',
    ],
    question: 'Do you have plans for schools or groups?',
    answer:
      "Absolutely! We offer **custom plans for schools, organisations, and cohorts**. Pricing and structure are tailored to your group size and needs. Reach out via the \"Let's Talk\" option and we'll build something together.",
  },

  // ─── CURRICULUM DEEP-DIVES ────────────────────────────────────────────────

  {
    id: 'curriculum-roadmap',
    group: 'global',
    label: 'Curriculum Roadmap',
    keywords: [
      'curriculum', 'syllabus', 'course content', 'what will i learn',
      'what do you teach', 'topics covered', 'subjects', 'modules',
      'mod1', 'mod2', 'mod3', 'mod4', 'mod5', 'mod6', 'mod7', 'mod8',
      'course outline', 'learning roadmap',
      'prompt engineering', 'sentiment analysis', 'memory', 'structured output',
      'classification', 'storytelling ai', 'ai creativity', 'ai portfolio',
      'founder mindset', 'capstone project',
    ],
    question: 'What does the curriculum cover?',
    answer:
      'Our curriculum follows a mastery-based roadmap from fundamentals to engineering:\n\n- **Module 1 — Talk to AI:** Prompt engineering & dynamic prompts\n- **Module 2 — AI Feels the Vibe:** Sentiment analysis & tone classification\n- **Module 3 — AI Remembers You:** System prompts, memory & stateful chat\n- **Module 4 — The Brain Organiser:** Structured output & JSON logic\n- **Module 5 — Lie Detector Mode:** Classification & reasoning chains\n- **Module 6 — Born to Storytell:** Creative generation & multimodal output\n- **Module 7 — Professional Showcase:** AI portfolio, resume & publishing\n- **Module 8 — Founder Capstone:** Problem framing → Pitch → AI Product Launch',
  },

  {
    id: 'module1',
    group: 'local',
    label: 'Module 1',
    keywords: [
      'module 1', 'mod 1', 'mod1', 'first module', 'talk to ai', 'prompting',
    ],
    question: 'What is covered in Module 1?',
    answer:
      "**Module 1 — AI Foundations:** Master the architecture of language.\n\n- Prompt Engineering — crafting professional-grade inputs\n- Input → Output dynamics — the mechanics of LLMs\n- Dynamic Architectures — building prompts that adapt to user data",
  },

  {
    id: 'module2',
    group: 'local',
    label: 'Module 2',
    keywords: [
      'module 2', 'mod 2', 'second module', 'wk2', 'week 2',
      'ai feels the vibe', 'sentiment', 'vibe',
      'sentiment analysis', 'emotion detection', 'mood detection',
      'tone classification', 'tone detection', 'tone analysis',
      'conditional rewriting', 'text rewriting', 'emotion ai',
    ],
    question: 'What is covered in Module 2?',
    answer:
      '**Module 2 — AI Feels the Vibe:** Words carry emotion — AI can read it. Explore how AI understands human sentiment:\n\n- Sentiment Analysis — detecting positive, negative, or neutral emotion\n- Tone Classification — identifying formal, sarcastic, or warm registers\n- Conditional Rewriting — shifting tone while preserving core meaning',
  },

  {
    id: 'module3',
    group: 'local',
    label: 'Module 3',
    keywords: [
      'module 3', 'mod 3', 'third module', 'wk3', 'week 3',
      'ai remembers you', 'ai memory', 'memory',
      'system prompts', 'system prompt', 'persona', 'ai persona',
      'conversation context', 'context window', 'chat history',
      'stateful chat', 'stateful', 'chatbot memory',
      'how does ai remember', 'how to give ai a personality',
    ],
    question: 'What is covered in Module 3?',
    answer:
      "**Module 3 — AI Remembers You:** Engineering persistence and personality. \n\n- System Prompts — setting rules, personas, and long-term behavior\n- Conversation Context — passing history so AI can reference prior thoughts\n- Stateful Chat — building responses that evolve over time",
  },

  {
    id: 'module4',
    group: 'local',
    label: 'Module 4',
    keywords: [
      'module 4', 'mod 4', 'fourth module', 'wk4', 'week 4', 'mod4',
      'brain organiser', 'brain organizer', 'organiser',
      'structured output', 'json', 'json parsing', 'tables', 'lists',
      'conditional logic', 'conditional inputs', 'structured data',
      'ai organises', 'ai organizer', 'data structure',
    ],
    question: 'What is covered in Module 4?',
    answer:
      "**Module 4 — The Brain Organiser:** Turning chaos into engineering clarity.\n\n- Structured Output — forcing AI to return JSON, tables, or clean lists\n- JSON Parsing — displaying AI data dynamically in any application UI\n- Conditional Logic — using logic-driven inputs to steer complex outputs",
  },

  {
    id: 'module5',
    group: 'local',
    label: 'Module 5',
    keywords: [
      'module 5', 'mod 5', 'fifth module', 'wk5', 'week 5',
      'lie detector', 'lie detector mode', 'fake news', 'real or fake',
      'classification', 'classify', 'ai classify',
      'confidence scoring', 'confidence score', 'probability',
      'chain of thought', 'chain-of-thought', 'reasoning', 'step by step reasoning',
      'spam detection', 'fact check', 'ai fact checking',
    ],
    question: 'What is covered in Module 5?',
    answer:
      '**Module 5 — Lie Detector Mode:** Teaching AI to judge, classify, and explain.\n\n- Advanced Classification — assigning inputs to professional categories\n- Confidence Scoring — calculating the probability of AI correctness\n- Chain-of-Thought — engineering reasoning steps for high-accuracy outputs',
  },

  {
    id: 'module6',
    group: 'local',
    label: 'Module 6',
    keywords: [
      'module 6', 'mod 6', 'sixth module', 'wk6', 'week 6',
      'born to storytell', 'storytelling', 'story', 'creative writing',
      'creative generation', 'ai storytelling', 'ai stories', 'ai writing',
      'style conditioning', 'genre', 'tone genre', 'narrative',
      'multimodal output', 'image generation', 'text and images',
      'ai co-author', 'ai author', 'creative ai',
    ],
    question: 'What is covered in Module 6?',
    answer:
      '**Module 6 — Born to Storytell:** AI as your professional co-author.\n\n- Creative Generation — original narrative production through prompting\n- Style Conditioning — steering outputs by genre or specific brand tone\n- Multimodal Mastery — bridging the gap between text and image generation',
  },

  {
    id: 'module7',
    group: 'local',
    label: 'Module 7',
    keywords: [
      'module 7', 'mod 7', 'seventh module', 'wk7', 'week 7',
      'your story your stage', 'portfolio', 'personal portfolio',
      'bio', 'resume', 'ai resume', 'ai bio', 'ai generated resume',
      'persona generation', 'professional identity', 'personal brand',
      'multi format output', 'multiple formats', 'repurpose content',
      'publishing', 'deploy', 'share online', 'go live', 'publish to web',
    ],
    question: 'What is covered in Module 7?',
    answer:
      '**Module 7 — Your Story, Your Stage:** Leveraging AI for personal branding.\n\n- Identity Engineering — using data to build a powerful professional persona\n- Multi-format Repurposing — transforming one core idea into resumes, bios, and posts\n- Live Deployment — publishing your AI-driven identity to the global web',
  },

  {
    id: 'module8',
    group: 'local',
    label: 'Module 8',
    keywords: [
      'module 8', 'mod 8', 'mod8', 'capstone', 'final project', 'founder', 'launch',
    ],
    question: 'What is covered in Module 8?',
    answer:
      '**Module 8 — Startup Mindset:** Architect and launch your final product.\n\n- Problem Framing — identifying high-value AI use cases\n- Structured Synthesis — building end-to-end AI workflows\n- Product Launch — deploying your solution to the web\n\nThis is the capstone — every learner leaves with a live, functional AI product they engineered themselves.',
  },

  {
    id: 'who-is-hekaos',
    group: 'local',
    label: 'Who is Hekaos?',
    keywords: [
      'hekaos', 'heka os', 'parent company', 'who is hekaos', 'what is hekaos',
      'hekaos brand', 'hekaos technology', 'hekaos data science',
      'cutting edge technology', 'engineered intelligence', 'fusing ai',
    ],
    question: 'What is the relationship between HekaHub and Hekaos?',
    answer:
      '**Hekaos** is the parent company behind HekaHub. While Hekaos focuses on high-level engineered intelligence for enterprises, **HekaHub** is our educational division dedicated to democratizing that same cutting-edge technology for innovators across all fields.',
  },

  {
    id: 'is-it-online',
    group: 'local',
    label: 'Online vs Offline',
    keywords: [
      'online', 'offline', 'remote', 'zoom', 'google meet', 'live classes',
      'where is it held', 'is it in person', 'face to face', 'physical location',
      'recorded', 'live session', 'interactive', 'is it a video course',
    ],
    question: 'Is HekaHub an online or offline program?',
    answer:
      'HekaHub is a **100% online, live, and interactive** program. Students join from all over the world, participating in real-time sessions led by experts. It is not a passive video course; it is an immersive, hands-on experience.',
  },

  {
    id: 'career-portfolio',
    group: 'local',
    label: 'Portfolio & Career',
    keywords: [
      'career', 'job', 'resume', 'cv', 'portfolio', 'college', 'university',
      'promotion', 'skills', 'innovator', 'why join',
    ],
    question: 'How does HekaHub help with my career or college applications?',
    answer:
      'HekaHub learners build a **professional AI portfolio** with 20+ projects. Whether you are applying to top-tier universities or looking to lead AI initiatives in your industry, graduating with a live, functional AI product is a massive differentiator in the digital economy.',
  },

  {
    id: 'math-coding-level',
    group: 'local',
    label: 'Math & Coding Level',
    keywords: [
      'math', 'mathematics', 'calculus', 'algebra', 'arithmetic', 'equations',
      'coding', 'programming', 'scripting', 'python', 'java', 'scratch', 'html',
      'difficulty', 'is it too hard', 'do i need to be a genius', 'smart',
      'complex', 'advanced math', 'do i need python', 'hard', 'easy',
      'technical skills', 'logic', 'problem solving',
    ],
    question: 'Do I need to be good at math or coding to join?',
    answer:
      'Absolutely not! We teach **AI logic**, not just syntax. If you can use a computer and have a curious mind, you can succeed. We start from first principles and guide you through even the most complex concepts using clear, "brain-first" infographics.',
  },

  {
    id: 'early-bird-enrollment',
    group: 'global',
    label: 'Early Bird & Enrollment',
    keywords: [
      'early bird', 'secure pricing', 'how to enroll', 'enrollment process',
      'payment', 'confirm spot', 'registration', 'lock in price',
    ],
    question: 'How do I secure the Early Bird pricing and complete enrollment?',
    answer:
      'To secure Early Bird pricing, fill out the registration form on our website. Once submitted, you will receive an email with payment instructions. Your spot and the discounted pricing are only locked in once the registration fee ($99) is processed.',
  },

  {
    id: 'laptop-mandatory',
    group: 'local',
    label: 'Laptop Requirement',
    keywords: [
      'laptop', 'computer', 'macbook', 'windows', 'mandatory', 'required',
      'do i need a laptop', 'is it mandatory', 'device',
    ],
    question: 'Is a laptop mandatory for the workshop?',
    answer:
      'Yes, a laptop (Windows, Mac, or Chromebook) is **mandatory**. This is a hands-on, "build-first" program, and mobile devices or tablets are not sufficient for the AI engineering tools we use in the curriculum.',
  },

  {
    id: 'contact-details',
    group: 'global',
    label: 'Contact Support',
    keywords: [
      'contact', 'support', 'help', 'email', 'phone', 'whatsapp',
      'reach out', 'talk to someone', 'customer service', 'inquiry',
      'register@hekahub.com', '+91 9235327048',
    ],
    question: 'How can I contact HekaHub?',
    answer:
      'You can reach us anytime at **register@hekahub.com** or via phone/WhatsApp at **+91 9235327048**. We are also active on socials like Instagram (@hekaos) and LinkedIn.',
  },

  {
    id: 'tools-needed',
    group: 'local',
    label: 'Tools & Software',
    keywords: [
      'tools', 'software', 'apps', 'applications', 'what do i need to install',
      'do i need chatgpt', 'do i need a subscription', 'paid tools', 'free tools',
      'laptop', 'computer', 'pc', 'macbook', 'chromebook', 'internet',
      'browser', 'chrome', 'windows', 'mac', 'linux',
    ],
    question: 'What tools or software do I need to join?',
    answer:
      'All you need is a **laptop (Windows, Mac, or Chromebook)** and a stable internet connection. We primarily use web-based AI tools, so you won\'t need to install heavy software. We will guide you on setting up free accounts for the AI platforms we use during the program.',
  },


  {
    id: 'projects-list',
    group: 'local',
    label: '20+ Projects',
    keywords: [
      'projects', 'what will i build', 'hands on', 'building', 'create',
      'real world projects', 'portfolio', 'list of projects', 'examples',
      'what do students build', 'ai products', 'apps', 'chatbots',
    ],
    question: 'What kind of projects will I build?',
    answer:
      'You will build **20+ real-world AI projects**, including:\n\n- **Personal AI Chatbots** with unique personalities\n- **Sentiment Analyzers** for social media\n- **AI Story Generators** with custom imagery\n- **Automated Organizers** for complex data\n- **A Final Capstone Product** based on your own startup idea',
  },
];