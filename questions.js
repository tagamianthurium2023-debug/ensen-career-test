
/* ==================================================
   沿線キャリア 自己分析ラボ
   診断設問マスタ v1.0.0
================================================== */

window.ENSEN_QUESTIONS = {

  version: "1.0.0",

  // 共通回答形式
  scales: {

    strength: [
      { value: 4, label: "とても当てはまる" },
      { value: 3, label: "やや当てはまる" },
      { value: 2, label: "どちらともいえない" },
      { value: 1, label: "あまり当てはまらない" },
      { value: 0, label: "まったく当てはまらない" },
      { value: null, label: "経験がなく、判断できない" }
    ],

    difficulty: [
      { value: 4, label: "とても負担を感じる" },
      { value: 3, label: "やや負担を感じる" },
      { value: 2, label: "状況による" },
      { value: 1, label: "あまり負担を感じない" },
      { value: 0, label: "ほとんど負担を感じない" },
      { value: null, label: "経験がなく、判断できない" }
    ],

    workstyle: [
      { value: 0, label: "Aの方が自分に合う" },
      { value: 1, label: "どちらかといえばA" },
      { value: 2, label: "どちらも同じくらい" },
      { value: 3, label: "どちらかといえばB" },
      { value: 4, label: "Bの方が自分に合う" },
      { value: null, label: "まだ分からない" }
    ],

    values: [
      { value: 4, label: "とても大切" },
      { value: 3, label: "大切" },
      { value: 2, label: "ある程度大切" },
      { value: 1, label: "優先度は低い" },
      { value: 0, label: "ほとんど重視しない" },
      { value: null, label: "まだ分からない" }
    ]

  },

  tests: [

    /* ==========================================
       TEST 01 強み発見診断
    ========================================== */

    {
      id: "strength",
      number: "01",
      title: "強み発見診断",
      subtitle: "まだ知らない、自分の可能性を見つける。",
      description:
        "普段の行動や考え方から、あなたが自然と発揮しやすい8つの強みを整理します。",

      instruction:
        "仕事、学校、アルバイト、家庭や日常生活での経験を思い浮かべて回答してください。理想の自分ではなく、普段の自分に近い回答を選びましょう。",

      color: "#009BBF",
      lightColor: "#EAF7FC",
      icon: "sparkles",
      minutes: 6,
      scale: "strength",
      scoring: "average",

      axes: [
        {
          id: "communication",
          name: "対人・関係構築力",
          short: "対人力"
        },
        {
          id: "empathy",
          name: "共感・支援力",
          short: "共感力"
        },
        {
          id: "analysis",
          name: "分析・論理的思考力",
          short: "分析力"
        },
        {
          id: "accuracy",
          name: "正確性・継続力",
          short: "正確性"
        },
        {
          id: "execution",
          name: "行動・実行力",
          short: "実行力"
        },
        {
          id: "creativity",
          name: "企画・創造力",
          short: "創造力"
        },
        {
          id: "coordination",
          name: "調整・協働力",
          short: "調整力"
        },
        {
          id: "adaptability",
          name: "適応・柔軟性",
          short: "適応力"
        }
      ],

      questions: [

        {
          id: "S01",
          axis: "communication",
          text: "初対面の人とも、共通の話題を見つけて会話を続けられる。"
        },
        {
          id: "S02",
          axis: "accuracy",
          text: "繰り返し行う作業でも、一定の丁寧さを保てる。"
        },
        {
          id: "S03",
          axis: "creativity",
          text: "既存のやり方を見て、別の方法や新しいアイデアを思いつくことがある。"
        },
        {
          id: "S04",
          axis: "empathy",
          text: "相手が困っているとき、何に困っているのかを考えて行動することが多い。"
        },
        {
          id: "S05",
          axis: "execution",
          text: "やるべきことが決まったら、比較的早く取りかかれる。"
        },
        {
          id: "S06",
          axis: "analysis",
          text: "問題が起きたとき、何が原因だったのかを整理して考える。"
        },
        {
          id: "S07",
          axis: "adaptability",
          text: "予定が変わったとき、別の方法を考えて対応できる。"
        },
        {
          id: "S08",
          axis: "coordination",
          text: "複数の人で何かを進めるとき、役割や状況を整理することが多い。"
        },

        {
          id: "S09",
          axis: "analysis",
          text: "複数の情報を比較し、違いや共通点を見つけることが得意だ。"
        },
        {
          id: "S10",
          axis: "communication",
          text: "相手に合わせて、説明の仕方や言葉の選び方を変えられる。"
        },
        {
          id: "S11",
          axis: "execution",
          text: "必要な情報がある程度そろえば、まず行動してみることができる。"
        },
        {
          id: "S12",
          axis: "accuracy",
          text: "提出物や作業内容に間違いがないか、確認する習慣がある。"
        },
        {
          id: "S13",
          axis: "coordination",
          text: "意見が異なる人同士の間に入り、共通点を探すことがある。"
        },
        {
          id: "S14",
          axis: "creativity",
          text: "何かを伝えるとき、より分かりやすい見せ方や表現を考えるのが得意だ。"
        },
        {
          id: "S15",
          axis: "empathy",
          text: "相手の表情や話し方から、言葉にしていない気持ちに気づくことがある。"
        },
        {
          id: "S16",
          axis: "adaptability",
          text: "初めての環境でも、周囲を観察しながら自分の動き方を調整できる。"
        },

        {
          id: "S17",
          axis: "creativity",
          text: "決まった正解がない課題でも、複数の案を考えられる。"
        },
        {
          id: "S18",
          axis: "coordination",
          text: "一緒に活動する人が動きやすいように、情報や段取りを整えることがある。"
        },
        {
          id: "S19",
          axis: "accuracy",
          text: "すぐに成果が見えなくても、必要な作業を継続できる。"
        },
        {
          id: "S20",
          axis: "communication",
          text: "相手の話を聞きながら、必要な質問をして会話を深められる。"
        },
        {
          id: "S21",
          axis: "adaptability",
          text: "自分の方法がうまくいかないとき、別のやり方を試せる。"
        },
        {
          id: "S22",
          axis: "empathy",
          text: "人に何かを教えるとき、相手の理解度に合わせて進められる。"
        },
        {
          id: "S23",
          axis: "analysis",
          text: "何かを判断するとき、感覚だけでなく理由や根拠も考える。"
        },
        {
          id: "S24",
          axis: "execution",
          text: "目標があるとき、達成するために必要な行動を起こせる。"
        },

        {
          id: "S25",
          axis: "empathy",
          text: "人から相談を受けたとき、すぐに結論を出さず、まず相手の話を聞ける。"
        },
        {
          id: "S26",
          axis: "adaptability",
          text: "新しいルールや方法を知ったとき、それに合わせて行動を変えられる。"
        },
        {
          id: "S27",
          axis: "communication",
          text: "自分の考えや必要な情報を、相手に伝わるように説明できる。"
        },
        {
          id: "S28",
          axis: "analysis",
          text: "複雑な話や課題を、いくつかの要素に分けて整理できる。"
        },
        {
          id: "S29",
          axis: "coordination",
          text: "複数の人の希望や事情を踏まえて、進め方を考えられる。"
        },
        {
          id: "S30",
          axis: "execution",
          text: "途中で問題が起きても、できることを探して物事を進められる。"
        },
        {
          id: "S31",
          axis: "creativity",
          text: "身近な不便や課題を見つけると、改善方法を考えることがある。"
        },
        {
          id: "S32",
          axis: "accuracy",
          text: "決められた手順や約束事を、安定して守ることができる。"
        }

      ]
    },

    /* ==========================================
       TEST 02 苦手の傾向診断
    ========================================== */

    {
      id: "difficulty",
      number: "02",
      title: "苦手の傾向診断",
      subtitle: "苦手を知ることも、自分を大切にすること。",
      description:
        "どのような業務や環境で負担を感じやすいのかを整理し、自分に合った働き方を考えるためのヒントを見つけます。",

      instruction:
        "次のような状況に置かれたとき、どの程度負担を感じるかを回答してください。苦手があることは、能力や人としての価値が低いことを意味しません。",

      color: "#F15A22",
      lightColor: "#FFF1E7",
      icon: "shield",
      minutes: 5,
      scale: "difficulty",
      scoring: "average",

      axes: [
        {
          id: "conflict",
          name: "対人緊張・対立",
          short: "対人緊張"
        },
        {
          id: "ambiguity",
          name: "曖昧な指示",
          short: "指示の曖昧さ"
        },
        {
          id: "change",
          name: "突発的な変化",
          short: "突発的変化"
        },
        {
          id: "multitask",
          name: "マルチタスク",
          short: "同時進行"
        },
        {
          id: "routine",
          name: "単調・反復作業",
          short: "反復作業"
        },
        {
          id: "pressure",
          name: "時間的プレッシャー",
          short: "時間的圧力"
        },
        {
          id: "detail",
          name: "細かな確認作業",
          short: "細部の確認"
        },
        {
          id: "decision",
          name: "自律的な意思決定",
          short: "自己判断"
        }
      ],

      questions: [

        {
          id: "D01",
          axis: "conflict",
          text: "意見が合わない相手と話し合い、結論を出す必要がある。"
        },
        {
          id: "D02",
          axis: "multitask",
          text: "複数の作業を同時に進めながら、途中で別の依頼にも対応する。"
        },
        {
          id: "D03",
          axis: "routine",
          text: "変化の少ない同じ作業を、長時間繰り返す。"
        },
        {
          id: "D04",
          axis: "ambiguity",
          text: "具体的な手順が示されないまま、作業を任される。"
        },
        {
          id: "D05",
          axis: "pressure",
          text: "短い制限時間の中で、一定の成果を求められる。"
        },
        {
          id: "D06",
          axis: "detail",
          text: "数字や文字の細かな違いを、一つずつ確認する。"
        },
        {
          id: "D07",
          axis: "change",
          text: "事前に決まっていた予定や手順が、直前に変更される。"
        },
        {
          id: "D08",
          axis: "decision",
          text: "周囲にすぐ相談できない状況で、自分の判断を求められる。"
        },

        {
          id: "D09",
          axis: "detail",
          text: "小さな間違いも見逃さないよう、長時間注意を維持する。"
        },
        {
          id: "D10",
          axis: "conflict",
          text: "不満を持っている相手や、強い口調の相手に対応する。"
        },
        {
          id: "D11",
          axis: "change",
          text: "慣れていた方法が突然変わり、新しい方法で進めることになる。"
        },
        {
          id: "D12",
          axis: "routine",
          text: "自分なりの工夫を加える余地が少ない作業を続ける。"
        },
        {
          id: "D13",
          axis: "decision",
          text: "複数の選択肢から、自分で一つを選び、その結果に対応する。"
        },
        {
          id: "D14",
          axis: "ambiguity",
          text: "何をもって完了とするのか、基準が明確でない作業を進める。"
        },
        {
          id: "D15",
          axis: "multitask",
          text: "作業の途中で何度も別の用件が入り、集中を切り替える。"
        },
        {
          id: "D16",
          axis: "pressure",
          text: "処理速度や達成件数を意識しながら作業する。"
        },

        {
          id: "D17",
          axis: "ambiguity",
          text: "人によって説明や指示の内容が異なる中で、進め方を考える。"
        },
        {
          id: "D18",
          axis: "pressure",
          text: "締め切りが迫っている中で、複数の対応を終わらせる。"
        },
        {
          id: "D19",
          axis: "conflict",
          text: "相手の希望に応えられないことを、直接伝える必要がある。"
        },
        {
          id: "D20",
          axis: "change",
          text: "予想していなかった問題が発生し、その場で対応方法を変える。"
        },
        {
          id: "D21",
          axis: "routine",
          text: "成果や進捗の変化が見えにくい作業を、継続する。"
        },
        {
          id: "D22",
          axis: "detail",
          text: "大量の書類やデータを、正確に照合・確認する。"
        },
        {
          id: "D23",
          axis: "decision",
          text: "細かな指示がない状態で、自分で優先順位を決める。"
        },
        {
          id: "D24",
          axis: "multitask",
          text: "異なる内容の依頼を複数覚えながら、順番に処理する。"
        }

      ]
    },

    /* ==========================================
       TEST 03 働き方タイプ診断
    ========================================== */

    {
      id: "workstyle",
      number: "03",
      title: "働き方タイプ診断",
      subtitle: "自分らしく力を発揮できる環境を知る。",
      description:
        "業務の進め方や職場環境に関する6つの視点から、あなたが心地よく働きやすい環境を整理します。",

      instruction:
        "AとBのうち、自分にとって働きやすそうな方を選んでください。どちらが優れているということはありません。",

      color: "#3D9254",
      lightColor: "#EAF5EC",
      icon: "compass",
      minutes: 5,
      scale: "workstyle",
      scoring: "bipolar",

      axes: [
        {
          id: "collaboration",
          name: "協働スタイル",
          short: "協働",
          left: "チームで協働",
          right: "個人で集中"
        },
        {
          id: "autonomy",
          name: "業務の進め方",
          short: "裁量",
          left: "明確なルール",
          right: "自由な裁量"
        },
        {
          id: "variety",
          name: "業務の変化",
          short: "変化",
          left: "安定した業務",
          right: "変化のある業務"
        },
        {
          id: "learning",
          name: "学習・教育環境",
          short: "教育",
          left: "丁寧な教育",
          right: "自主的な学習"
        },
        {
          id: "pace",
          name: "成果の出し方",
          short: "進め方",
          left: "スピード重視",
          right: "品質重視"
        },
        {
          id: "interaction",
          name: "業務の対象",
          short: "業務対象",
          left: "人と関わる",
          right: "情報・物事を扱う"
        }
      ],

      questions: [

        {
          id: "W01",
          axis: "collaboration",
          text: "日々の業務を進めるなら？",
          a: "周囲と相談しながら進めたい",
          b: "自分の担当に集中して進めたい"
        },
        {
          id: "W02",
          axis: "autonomy",
          text: "仕事の進め方について、どちらが安心できる？",
          a: "手順や基準が明確に決まっている",
          b: "目的に合わせて自分で方法を選べる"
        },
        {
          id: "W03",
          axis: "variety",
          text: "毎日の仕事内容として好ましいのは？",
          a: "ある程度決まった流れがある",
          b: "日によって異なる内容に取り組める"
        },
        {
          id: "W04",
          axis: "learning",
          text: "新しい仕事を覚えるなら？",
          a: "段階的に教えてもらいたい",
          b: "自分で調べたり試したりしたい"
        },
        {
          id: "W05",
          axis: "pace",
          text: "どちらの進め方が自分に合う？",
          a: "一定の品質を保ちながら素早く進める",
          b: "時間をかけて仕上がりを高める"
        },
        {
          id: "W06",
          axis: "interaction",
          text: "どちらの業務に興味を持ちやすい？",
          a: "人と話し、要望に応える業務",
          b: "情報や資料を整理する業務"
        },

        {
          id: "W07",
          axis: "variety",
          text: "仕事で安心感を得やすいのは？",
          a: "慣れた業務を安定して続けること",
          b: "新しい業務や課題に取り組むこと"
        },
        {
          id: "W08",
          axis: "interaction",
          text: "成果を感じやすいのは？",
          a: "相手から直接反応をもらえる仕事",
          b: "完成した資料や成果物が残る仕事"
        },
        {
          id: "W09",
          axis: "collaboration",
          text: "目標に向かうとき、どちらが好ましい？",
          a: "チームで役割を分担する",
          b: "個人の担当範囲が明確になっている"
        },
        {
          id: "W10",
          axis: "learning",
          text: "未経験の業務に取り組むなら？",
          a: "見本や研修が用意されている",
          b: "試行錯誤できる余地がある"
        },
        {
          id: "W11",
          axis: "autonomy",
          text: "上司から仕事を任されるなら？",
          a: "具体的な進め方まで共有してほしい",
          b: "目標を共有し、方法は任せてほしい"
        },
        {
          id: "W12",
          axis: "pace",
          text: "作業を終える際に、より達成感があるのは？",
          a: "予定した件数を効率よく完了する",
          b: "一つひとつ納得できる品質に仕上げる"
        },

        {
          id: "W13",
          axis: "learning",
          text: "分からないことが出てきたときは？",
          a: "詳しい人から説明を受けて理解したい",
          b: "まず自分で情報を集めて理解したい"
        },
        {
          id: "W14",
          axis: "collaboration",
          text: "集中しやすい職場は？",
          a: "周囲と気軽にやり取りできる職場",
          b: "一人で作業に没頭できる職場"
        },
        {
          id: "W15",
          axis: "interaction",
          text: "比較的長く続けられそうなのは？",
          a: "人との会話や対応が中心の仕事",
          b: "資料・商品・データなどを扱う仕事"
        },
        {
          id: "W16",
          axis: "variety",
          text: "どちらの仕事に魅力を感じる？",
          a: "経験を積み、同じ業務の精度を高める",
          b: "さまざまな業務を経験し、幅を広げる"
        },
        {
          id: "W17",
          axis: "pace",
          text: "同じ基準を満たす仕事なら？",
          a: "効率化して、より多くの仕事を進めたい",
          b: "細部を磨き、完成度をさらに高めたい"
        },
        {
          id: "W18",
          axis: "autonomy",
          text: "職場のルールについて、好ましいのは？",
          a: "誰が担当しても同じ方法で進められる",
          b: "担当者の工夫に応じて方法を変えられる"
        },

        {
          id: "W19",
          axis: "pace",
          text: "どちらの業務環境で力を発揮しやすそう？",
          a: "テンポよく案件を処理する環境",
          b: "落ち着いて内容を確認できる環境"
        },
        {
          id: "W20",
          axis: "autonomy",
          text: "自分の仕事を評価してもらうなら？",
          a: "定められた手順と基準に沿った遂行",
          b: "自分なりの工夫や方法による成果"
        },
        {
          id: "W21",
          axis: "learning",
          text: "成長しやすいと感じる環境は？",
          a: "定期的に指導や助言を受けられる",
          b: "自分で課題を見つけて学べる"
        },
        {
          id: "W22",
          axis: "interaction",
          text: "興味を持ちやすい課題は？",
          a: "人の悩みや希望を理解すること",
          b: "仕組みや情報の問題を解決すること"
        },
        {
          id: "W23",
          axis: "collaboration",
          text: "どちらの働き方が心地よい？",
          a: "周囲と進捗や成果を共有しながら働く",
          b: "自分の担当業務を完結させながら働く"
        },
        {
          id: "W24",
          axis: "variety",
          text: "長期的に働く職場として好ましいのは？",
          a: "業務内容や役割が安定している職場",
          b: "新しい役割や業務に挑戦できる職場"
        }

      ]
    },

    /* ==========================================
       TEST 04 仕事の価値観診断
    ========================================== */

    {
      id: "values",
      number: "04",
      title: "仕事の価値観診断",
      subtitle: "なりたい自分から、仕事を考える。",
      description:
        "仕事選びにおいて何を大切にしたいのかを整理し、これからの人生に合ったキャリアを考えます。",

      instruction:
        "今のあなたが仕事を選ぶとしたら、次の項目をどの程度大切にしたいかを回答してください。世間一般の正解ではなく、自分自身の希望を基準にしましょう。",

      color: "#B68B00",
      lightColor: "#FFF8D9",
      icon: "heart",
      minutes: 4,
      scale: "values",
      scoring: "priority",
      priorityCount: 5,

      axes: [
        {
          id: "income",
          name: "収入・待遇",
          short: "収入"
        },
        {
          id: "security",
          name: "雇用の安定",
          short: "安定"
        },
        {
          id: "relationships",
          name: "人間関係",
          short: "人間関係"
        },
        {
          id: "growth",
          name: "成長・スキル習得",
          short: "成長"
        },
        {
          id: "balance",
          name: "生活との両立",
          short: "両立"
        },
        {
          id: "location",
          name: "勤務地・通勤",
          short: "勤務地"
        },
        {
          id: "interest",
          name: "仕事内容への興味",
          short: "興味"
        },
        {
          id: "contribution",
          name: "社会・地域への貢献",
          short: "貢献"
        },
        {
          id: "freedom",
          name: "裁量・自由度",
          short: "自由度"
        },
        {
          id: "recognition",
          name: "評価・承認",
          short: "評価"
        },
        {
          id: "future",
          name: "将来の可能性",
          short: "将来性"
        },
        {
          id: "wellbeing",
          name: "心身のゆとり",
          short: "ゆとり"
        }
      ],

      questions: [

        {
          id: "V01",
          axis: "income",
          text: "希望する生活水準を実現できる給与や待遇があること。",
          detail: "基本給・賞与・昇給・福利厚生など"
        },
        {
          id: "V02",
          axis: "security",
          text: "将来にわたって、安定して働き続けられること。",
          detail: "雇用の安定・事業の継続性など"
        },
        {
          id: "V03",
          axis: "relationships",
          text: "周囲の人と良好な関係を築きながら働けること。",
          detail: "上司・同僚・職場の雰囲気など"
        },
        {
          id: "V04",
          axis: "growth",
          text: "新しい知識やスキルを身につけ、成長できること。",
          detail: "研修・資格取得・実務経験など"
        },
        {
          id: "V05",
          axis: "balance",
          text: "仕事以外の生活や、自分の時間を大切にできること。",
          detail: "休日・勤務時間・家庭や趣味との両立など"
        },
        {
          id: "V06",
          axis: "location",
          text: "自分の生活圏に近く、無理なく通勤できること。",
          detail: "通勤時間・交通手段・勤務地など"
        },
        {
          id: "V07",
          axis: "interest",
          text: "興味や関心を持てる仕事内容であること。",
          detail: "好きな分野・商品・業界・業務内容など"
        },
        {
          id: "V08",
          axis: "contribution",
          text: "誰かの役に立ち、社会や地域に貢献できること。",
          detail: "顧客支援・地域活性化・社会的意義など"
        },
        {
          id: "V09",
          axis: "freedom",
          text: "自分の考えや工夫を仕事に反映できること。",
          detail: "裁量・業務の自由度・柔軟な働き方など"
        },
        {
          id: "V10",
          axis: "recognition",
          text: "努力や成果を適切に評価してもらえること。",
          detail: "評価制度・昇進・周囲からの承認など"
        },
        {
          id: "V11",
          axis: "future",
          text: "将来目指したい姿につながる経験ができること。",
          detail: "キャリアアップ・独立・専門性・選択肢の拡大など"
        },
        {
          id: "V12",
          axis: "wellbeing",
          text: "心身に過度な負担をかけず、穏やかに働けること。",
          detail: "業務量・心理的な安心感・働くペースなど"
        }

      ],

      priorityInstruction:
        "すべてを満たす仕事が見つからないとしたら、何を優先したいですか？ 特に大切にしたい項目を最大5つ選び、優先順位をつけてみましょう。"

    }

  ]

};
