
/* ==================================================
   沿線キャリア 自己分析ラボ
   診断結果・職種提案マスタ v1.0.0
================================================== */

window.ENSEN_RESULTS = {

  version: "1.0.0",

  philosophy: {
    headline: "なりたい自分から、働き方を考える。",
    message:
      "仕事は、なりたい自分に近づくための手段のひとつです。得意なことも、苦手なことも、あなたの可能性を考えるための大切な情報です。",
    consultation:
      "沿線キャリアでは、診断結果だけで仕事を決めるのではなく、これまでの経験や将来像を一緒に整理し、あなたに合ったキャリアの選択肢を考えます。",
    regional:
      "東西線沿線を中心に、ご希望や求人状況に応じて沿線外の求人についてもご提案します。",
    noJobChange:
      "今すぐ転職する予定がなくても大丈夫。これからの働き方について、一緒に考えてみませんか？"
  },

  /* ==========================================
     TEST 01 強み発見診断
  ========================================== */

  strength: {

    communication: {
      name: "対人・関係構築力",
      title: "人との距離を縮める力",
      catchcopy: "人と人をつなぎ、関係を育てる。",
      description:
        "相手との会話を通じて関係を築き、必要な情報や自分の考えを伝えることに強みがある傾向です。人との接点が多い場面で、持ち味を発揮できる可能性があります。",
      strengths: [
        "初対面の相手とも関係を築く",
        "相手に合わせて伝え方を変える",
        "会話を通じて必要な情報を引き出す",
        "自分の考えを言葉にして伝える"
      ],
      caution:
        "会話が円滑に進むことを優先するあまり、細かな確認や記録が後回しになることがあります。また、対人能力が高くても、人と接し続けることに疲れを感じる場合があります。",
      environments: [
        "人との接点が多い職場",
        "顧客の反応を直接確認できる仕事",
        "コミュニケーションを活かせる環境"
      ],
      keywords: ["接客", "営業", "受付", "顧客対応"],
      interview:
        "人との関係を築くことが得意だと感じた具体的な経験を振り返ってみましょう。"
    },

    empathy: {
      name: "共感・支援力",
      title: "相手の気持ちを理解し、支える力",
      catchcopy: "誰かの可能性を、そっと支える。",
      description:
        "相手の状況や気持ちに目を向け、必要なサポートを考えることに強みがある傾向です。人の安心や成長を支える場面で力を発揮できる可能性があります。",
      strengths: [
        "相手の話を丁寧に聞く",
        "困っている人に気づく",
        "相手の理解度に合わせて説明する",
        "人の成長や安心を支える"
      ],
      caution:
        "相手の気持ちを優先するあまり、自分の負担や希望を後回しにすることがあります。相手に寄り添うことと、相手の課題をすべて引き受けることは別です。",
      environments: [
        "人を支援する仕事",
        "丁寧な対応が評価される職場",
        "相談しやすい人間関係のある環境"
      ],
      keywords: ["サポート", "教育", "相談", "ホスピタリティ"],
      interview:
        "人を支えることにやりがいを感じる場面と、負担を感じる場面を整理してみましょう。"
    },

    analysis: {
      name: "分析・論理的思考力",
      title: "情報を整理し、答えを導く力",
      catchcopy: "複雑な物事から、本質を見つける。",
      description:
        "情報を比較したり、問題の原因を整理したりすることに強みがある傾向です。理由や根拠を考えながら、物事を理解する場面で力を発揮できる可能性があります。",
      strengths: [
        "問題の原因を整理する",
        "情報の違いや共通点を見つける",
        "根拠をもとに判断する",
        "複雑な課題を分解する"
      ],
      caution:
        "納得できる根拠を求めるあまり、情報が十分にそろうまで行動を保留することがあります。判断の正確さと、行動するタイミングのバランスが課題になる場合があります。",
      environments: [
        "情報やデータを扱う仕事",
        "課題解決が求められる環境",
        "考える時間を確保できる職場"
      ],
      keywords: ["分析", "調査", "改善", "情報整理"],
      interview:
        "どのような情報や課題を扱うときに、考えることを楽しいと感じるか振り返ってみましょう。"
    },

    accuracy: {
      name: "正確性・継続力",
      title: "丁寧に積み重ねる力",
      catchcopy: "小さな積み重ねを、確かな成果に。",
      description:
        "決められた手順を守り、安定した品質で作業を続けることに強みがある傾向です。正確さや継続性が求められる仕事で、持ち味を発揮できる可能性があります。",
      strengths: [
        "作業内容を丁寧に確認する",
        "一定の品質を保つ",
        "必要な作業を継続する",
        "手順やルールに沿って進める"
      ],
      caution:
        "正確さを重視するあまり、確認に時間をかけすぎることがあります。また、急な変更や例外対応が多い環境では、負担を感じる場合があります。",
      environments: [
        "手順や基準が明確な職場",
        "丁寧な仕事が評価される環境",
        "安定した業務に取り組める仕事"
      ],
      keywords: ["事務", "品質管理", "確認", "継続"],
      interview:
        "丁寧に続けられる作業と、繰り返すことに負担を感じる作業の違いを考えてみましょう。"
    },

    execution: {
      name: "行動・実行力",
      title: "考えを行動に移す力",
      catchcopy: "一歩を踏み出し、物事を前に進める。",
      description:
        "目標や課題に対して行動を起こし、物事を進めることに強みがある傾向です。成果が見えやすい仕事や、自ら動くことが求められる場面で力を発揮できる可能性があります。",
      strengths: [
        "必要なことに早く取りかかる",
        "目標に向けて行動する",
        "問題があっても次の方法を考える",
        "考えたことを実際に試す"
      ],
      caution:
        "行動を優先することで、事前確認や周囲との認識合わせが不足することがあります。早く進めることと、適切な手順で進めることの両立が重要です。",
      environments: [
        "成果や進捗が見えやすい仕事",
        "主体的に動ける職場",
        "新しいことに挑戦できる環境"
      ],
      keywords: ["実行", "営業", "運営", "挑戦"],
      interview:
        "自分から行動したことで、物事がうまく進んだ経験を整理してみましょう。"
    },

    creativity: {
      name: "企画・創造力",
      title: "新しい可能性を生み出す力",
      catchcopy: "当たり前の中から、新しい選択肢を。",
      description:
        "既存の方法にとらわれず、新しいアイデアや改善方法を考えることに強みがある傾向です。工夫や発想が求められる場面で力を発揮できる可能性があります。",
      strengths: [
        "新しいアイデアを考える",
        "既存の方法を改善する",
        "分かりやすい表現を考える",
        "複数の選択肢を生み出す"
      ],
      caution:
        "新しいアイデアに関心が向くことで、既存の作業を継続したり、細部を仕上げたりすることが負担になる場合があります。",
      environments: [
        "提案や改善が歓迎される職場",
        "企画や表現に関われる仕事",
        "自分なりの工夫ができる環境"
      ],
      keywords: ["企画", "制作", "改善", "発想"],
      interview:
        "どのようなテーマなら自然とアイデアが浮かぶのか、興味のある分野を整理してみましょう。"
    },

    coordination: {
      name: "調整・協働力",
      title: "人と物事を円滑につなぐ力",
      catchcopy: "周囲と協力し、物事を整える。",
      description:
        "複数の人の状況や希望を踏まえながら、物事を進めることに強みがある傾向です。関係者の連携や段取りが重要な仕事で力を発揮できる可能性があります。",
      strengths: [
        "関係者の状況を整理する",
        "情報や役割を共有する",
        "異なる意見の共通点を探す",
        "周囲が動きやすい段取りを考える"
      ],
      caution:
        "全員の希望を考慮しようとするあまり、判断が遅れたり、自分の担当範囲を超えて仕事を抱えたりすることがあります。",
      environments: [
        "複数の人と連携する仕事",
        "進行管理や調整を担う職場",
        "チームで成果を目指す環境"
      ],
      keywords: ["調整", "進行管理", "運営", "協働"],
      interview:
        "複数の人が関わる場面で、自然とどのような役割を担っているか考えてみましょう。"
    },

    adaptability: {
      name: "適応・柔軟性",
      title: "変化に合わせて動く力",
      catchcopy: "変化を受け入れ、次の方法を見つける。",
      description:
        "状況や環境の変化に合わせて、考え方や行動を調整することに強みがある傾向です。さまざまな業務や人に関わる仕事で力を発揮できる可能性があります。",
      strengths: [
        "新しい環境に対応する",
        "状況に応じて方法を変える",
        "予定変更に対応する",
        "異なる考え方を取り入れる"
      ],
      caution:
        "周囲に合わせることが得意な一方で、自分の希望や判断基準が曖昧になることがあります。また、変化に対応できることと、変化を好むことは必ずしも同じではありません。",
      environments: [
        "さまざまな業務を経験できる職場",
        "状況に応じた対応が必要な仕事",
        "新しい方法を取り入れる環境"
      ],
      keywords: ["柔軟性", "対応", "現場運営", "変化"],
      interview:
        "変化に対応できた経験と、変化が続いて疲れた経験の両方を振り返ってみましょう。"
    }

  },

  /* ==========================================
     強みの組み合わせ
     上位2軸をもとにした結果タイトル
  ========================================== */

  combinations: [

    {
      axes: ["communication", "empathy"],
      title: "人に寄り添い、信頼を育てる人",
      description:
        "人との関係を築く力と、相手を理解する力を組み合わせて、安心感のあるコミュニケーションを生み出せる可能性があります。"
    },
    {
      axes: ["communication", "analysis"],
      title: "考えを整理し、相手に届ける人",
      description:
        "情報を理解する力と伝える力を組み合わせ、複雑な内容を相手に分かりやすく伝えることに強みを発揮できる可能性があります。"
    },
    {
      axes: ["communication", "accuracy"],
      title: "丁寧な対応で信頼を築く人",
      description:
        "対人対応と正確な業務遂行を組み合わせ、安心して仕事を任せてもらえる関係を築ける可能性があります。"
    },
    {
      axes: ["communication", "execution"],
      title: "人を巻き込み、前に進む人",
      description:
        "人との関係を築きながら、自ら行動して目標に向かうことに強みを発揮できる可能性があります。"
    },
    {
      axes: ["communication", "creativity"],
      title: "アイデアを言葉にして届ける人",
      description:
        "新しい発想と伝える力を組み合わせ、提案や情報発信の場面で持ち味を発揮できる可能性があります。"
    },
    {
      axes: ["communication", "coordination"],
      title: "人と人をつなぎ、物事を整える人",
      description:
        "関係構築力と調整力を活かし、複数の関係者が関わる仕事を円滑に進められる可能性があります。"
    },
    {
      axes: ["communication", "adaptability"],
      title: "相手と状況に合わせて動ける人",
      description:
        "人との関係や環境の変化に応じて、柔軟なコミュニケーションを取れる可能性があります。"
    },
    {
      axes: ["empathy", "analysis"],
      title: "相手を理解し、課題を整理する人",
      description:
        "相手の気持ちに配慮しながら、課題の背景や解決方法を考えることに強みを発揮できる可能性があります。"
    },
    {
      axes: ["empathy", "accuracy"],
      title: "丁寧な仕事で人を支える人",
      description:
        "相手への配慮と正確な作業を組み合わせ、安心感のあるサポートを提供できる可能性があります。"
    },
    {
      axes: ["empathy", "execution"],
      title: "誰かのために行動できる人",
      description:
        "相手の困りごとに気づき、必要な行動を起こすことで、人を支える力を発揮できる可能性があります。"
    },
    {
      axes: ["empathy", "creativity"],
      title: "人の気持ちから新しい価値を考える人",
      description:
        "相手の希望や困りごとを起点として、新しいアイデアやサービスを考えられる可能性があります。"
    },
    {
      axes: ["empathy", "coordination"],
      title: "周囲を支え、チームを整える人",
      description:
        "一人ひとりの状況を理解しながら、周囲が協力しやすい環境をつくることに強みを発揮できる可能性があります。"
    },
    {
      axes: ["empathy", "adaptability"],
      title: "相手に合わせた支援ができる人",
      description:
        "相手の状況や理解度に応じて、サポートの方法を柔軟に変えられる可能性があります。"
    },
    {
      axes: ["analysis", "accuracy"],
      title: "根拠を大切に、確かな成果をつくる人",
      description:
        "情報を整理する力と正確な作業を組み合わせ、品質や信頼性が求められる仕事で持ち味を発揮できる可能性があります。"
    },
    {
      axes: ["analysis", "execution"],
      title: "考えたことを成果につなげる人",
      description:
        "課題を整理する力と行動力を組み合わせ、考えた解決策を実際に試すことに強みを発揮できる可能性があります。"
    },
    {
      axes: ["analysis", "creativity"],
      title: "課題から新しい仕組みを考える人",
      description:
        "問題の原因を整理しながら、新しい方法や改善策を生み出すことに強みを発揮できる可能性があります。"
    },
    {
      axes: ["analysis", "coordination"],
      title: "複雑な状況を整理し、進める人",
      description:
        "情報や関係者の状況を整理し、複雑な仕事を円滑に進めることに強みを発揮できる可能性があります。"
    },
    {
      axes: ["analysis", "adaptability"],
      title: "状況を読み解き、柔軟に対応する人",
      description:
        "変化する状況を理解し、根拠を踏まえて対応方法を考えられる可能性があります。"
    },
    {
      axes: ["accuracy", "execution"],
      title: "着実な行動で成果を積み重ねる人",
      description:
        "行動力と丁寧な業務遂行を組み合わせ、必要な仕事を安定して進められる可能性があります。"
    },
    {
      axes: ["accuracy", "creativity"],
      title: "アイデアを丁寧に形にする人",
      description:
        "新しい発想を具体的な成果物に落とし込み、細部まで仕上げることに強みを発揮できる可能性があります。"
    },
    {
      axes: ["accuracy", "coordination"],
      title: "細かな配慮で仕事を円滑にする人",
      description:
        "正確な情報管理と調整力を組み合わせ、周囲が安心して仕事を進められる環境を支えられる可能性があります。"
    },
    {
      axes: ["accuracy", "adaptability"],
      title: "変化の中でも丁寧さを保てる人",
      description:
        "環境や手順が変わる場面でも、必要な品質や正確さを意識して対応できる可能性があります。"
    },
    {
      axes: ["execution", "creativity"],
      title: "新しいアイデアを行動に変える人",
      description:
        "発想力と行動力を組み合わせ、思いついた方法を試しながら、新しい価値を生み出せる可能性があります。"
    },
    {
      axes: ["execution", "coordination"],
      title: "周囲と協力し、物事を前に進める人",
      description:
        "自ら行動しながら関係者との連携を整え、目標に向かって仕事を進められる可能性があります。"
    },
    {
      axes: ["execution", "adaptability"],
      title: "変化を受け止め、次の一歩を踏み出す人",
      description:
        "状況の変化に応じて方法を切り替えながら、必要な行動を起こせる可能性があります。"
    },
    {
      axes: ["creativity", "coordination"],
      title: "多様な意見から新しい価値を生む人",
      description:
        "周囲の意見や状況を整理しながら、新しい企画や改善方法を考えられる可能性があります。"
    },
    {
      axes: ["creativity", "adaptability"],
      title: "変化の中から可能性を見つける人",
      description:
        "新しい状況や課題を受け入れ、柔軟な発想で別の選択肢を考えられる可能性があります。"
    },
    {
      axes: ["coordination", "adaptability"],
      title: "変化に対応し、周囲を整える人",
      description:
        "状況が変わる中でも、関係者の連携や仕事の進め方を調整できる可能性があります。"
    }

  ],

  /* ==========================================
     TEST 02 苦手の傾向診断
  ========================================== */

  difficulty: {

    conflict: {
      name: "対人緊張・対立",
      title: "緊張感のある対人対応",
      description:
        "意見の対立や強い口調でのやり取りなど、緊張感のある対人場面で負担を感じやすい傾向があります。",
      background:
        "人と関わること自体が苦手とは限りません。相手との関係を大切にするからこそ、対立する場面に負担を感じる場合もあります。",
      environments: [
        "相談や協力がしやすい職場",
        "困難な顧客対応を一人で抱えない環境",
        "対応ルールが整備された職場"
      ],
      caution:
        "クレーム対応や交渉、意見の対立が頻繁に発生する業務では、サポート体制を確認しておくとよいでしょう。",
      interview:
        "人との関わりの中で、どのような場面に負担を感じるのか整理しましょう。"
    },

    ambiguity: {
      name: "曖昧な指示",
      title: "目的や基準が不明確な業務",
      description:
        "具体的な指示や完了基準が示されない状態で仕事を進めることに、負担を感じやすい傾向があります。",
      background:
        "仕事への意欲が低いということではなく、目的や基準を理解したうえで取り組みたいという特性かもしれません。",
      environments: [
        "指示や役割が明確な職場",
        "業務マニュアルが整備された環境",
        "不明点を確認しやすい職場"
      ],
      caution:
        "業務範囲が頻繁に変わる職場や、具体的な説明が少ない環境では負担が大きくなる場合があります。",
      interview:
        "どの程度の説明や情報があれば、安心して仕事に取り組めるか考えてみましょう。"
    },

    change: {
      name: "突発的な変化",
      title: "予定外の変更や突発対応",
      description:
        "予定や手順が急に変わる場面で、負担を感じやすい傾向があります。",
      background:
        "事前に準備を整え、見通しを持って取り組むことで力を発揮しやすい可能性があります。",
      environments: [
        "予定や業務の流れが明確な職場",
        "変更内容が事前に共有される環境",
        "突発対応を分担できる職場"
      ],
      caution:
        "急な予定変更や緊急対応が日常的に発生する仕事では、実際の業務頻度や支援体制を確認しましょう。",
      interview:
        "どのような変更なら対応しやすく、どのような変更に負担を感じるのか整理しましょう。"
    },

    multitask: {
      name: "マルチタスク",
      title: "複数業務の同時進行",
      description:
        "複数の依頼を並行して処理したり、頻繁に集中を切り替えたりする場面で負担を感じやすい傾向があります。",
      background:
        "一つの業務に集中することで、より高い品質や安定した成果を発揮できる可能性があります。",
      environments: [
        "担当業務が明確な職場",
        "一つずつ作業を進められる環境",
        "依頼や優先順位が整理された職場"
      ],
      caution:
        "電話対応、来客対応、事務処理などを同時に求められる仕事では、業務分担を確認しておくとよいでしょう。",
      interview:
        "集中しやすい作業環境や、対応しやすい依頼の受け方について考えてみましょう。"
    },

    routine: {
      name: "単調・反復作業",
      title: "変化の少ない繰り返し業務",
      description:
        "同じ作業を長時間続けることや、工夫する余地の少ない業務で負担を感じやすい傾向があります。",
      background:
        "継続力がないとは限りません。目的や成果が見えたり、変化があったりすることで意欲を維持しやすい可能性があります。",
      environments: [
        "複数の業務を経験できる職場",
        "改善や工夫が歓迎される環境",
        "成果や進捗が見えやすい仕事"
      ],
      caution:
        "長時間の入力作業や同じ工程を繰り返す仕事では、業務内容や作業時間を具体的に確認しましょう。",
      interview:
        "繰り返しでも続けられることと、飽きや負担を感じることの違いを整理しましょう。"
    },

    pressure: {
      name: "時間的プレッシャー",
      title: "時間や件数に追われる業務",
      description:
        "短い時間で成果を求められる場面や、処理件数を強く意識する環境で負担を感じやすい傾向があります。",
      background:
        "時間に余裕があることで、丁寧さや判断力を発揮しやすい可能性があります。",
      environments: [
        "現実的な業務量が設定された職場",
        "品質も評価される環境",
        "相談や業務調整ができる職場"
      ],
      caution:
        "厳しい件数目標や時間制限がある仕事では、評価制度や実際の業務量を確認しましょう。",
      interview:
        "目標があることで意欲が高まる場合と、負担が大きくなる場合を整理しましょう。"
    },

    detail: {
      name: "細かな確認作業",
      title: "細部への注意を維持する業務",
      description:
        "数字や文字の照合など、細かな違いに注意を払い続ける業務で負担を感じやすい傾向があります。",
      background:
        "細部よりも全体像を捉えたり、人や物事を動かしたりする場面で力を発揮しやすい可能性があります。",
      environments: [
        "対人対応や現場業務を含む仕事",
        "確認作業を仕組みで補える職場",
        "業務の種類に変化がある環境"
      ],
      caution:
        "大量のデータ入力や照合作業を中心とする仕事では、確認方法やミス防止の仕組みを確認しましょう。",
      interview:
        "細かな作業の中でも、どのような内容なら取り組みやすいか考えてみましょう。"
    },

    decision: {
      name: "自律的な意思決定",
      title: "一人で判断する場面",
      description:
        "十分な相談や判断基準がない状態で、自分だけで決定することに負担を感じやすい傾向があります。",
      background:
        "周囲と認識を合わせながら進めることや、判断の根拠を確認することを大切にしている可能性があります。",
      environments: [
        "相談できる上司や先輩がいる職場",
        "判断基準が共有されている環境",
        "段階的に裁量を広げられる職場"
      ],
      caution:
        "入社直後から大きな判断を任される環境では、教育体制や相談先を確認しておくとよいでしょう。",
      interview:
        "どのような経験や情報があれば、自分で判断することに安心感を持てるか考えてみましょう。"
    }

  },

  /* ==========================================
     TEST 03 働き方タイプ診断
  ========================================== */

  workstyle: {

    collaboration: {
      name: "協働スタイル",
      left: {
        title: "チーム協働型",
        description:
          "周囲と相談し、役割を分担しながら働く環境を好む傾向があります。",
        environments: [
          "チームで目標を共有する職場",
          "相談や情報共有がしやすい環境"
        ],
        caution:
          "連携が多い職場でも、役割や責任範囲が明確かどうかを確認しましょう。"
      },
      center: {
        title: "協働・集中バランス型",
        description:
          "周囲との協力と、自分の担当に集中する時間の両方を大切にする傾向があります。",
        environments: [
          "個人業務とチーム業務がある職場"
        ],
        caution:
          "実際の業務における個人作業と協働の割合を確認しましょう。"
      },
      right: {
        title: "個人集中型",
        description:
          "自分の担当範囲が明確で、集中して業務に取り組める環境を好む傾向があります。",
        environments: [
          "担当業務が明確な職場",
          "集中できる時間を確保しやすい環境"
        ],
        caution:
          "一人で進める業務でも、必要な相談や報告ができる環境か確認しましょう。"
      }
    },

    autonomy: {
      name: "業務の進め方",
      left: {
        title: "ルール・基準重視型",
        description:
          "手順や判断基準が明確な環境で、安心して仕事を進めたい傾向があります。",
        environments: [
          "業務マニュアルが整備された職場",
          "評価基準が明確な環境"
        ],
        caution:
          "ルールの明確さと、必要な改善提案ができる環境かどうかを確認しましょう。"
      },
      center: {
        title: "基準・裁量バランス型",
        description:
          "一定のルールを理解したうえで、自分なりの工夫も取り入れたい傾向があります。",
        environments: [
          "基本ルールと裁量の両方がある職場"
        ],
        caution:
          "どの範囲まで自分で判断できるのか確認しましょう。"
      },
      right: {
        title: "裁量・工夫重視型",
        description:
          "目的や目標を理解したうえで、自分で方法を考えられる環境を好む傾向があります。",
        environments: [
          "改善提案が歓迎される職場",
          "業務の進め方に裁量がある環境"
        ],
        caution:
          "裁量の大きさに伴う責任や、相談体制も確認しましょう。"
      }
    },

    variety: {
      name: "業務の変化",
      left: {
        title: "安定・専門性重視型",
        description:
          "慣れた業務の経験を積み重ね、仕事の精度や専門性を高めることを好む傾向があります。",
        environments: [
          "業務内容が安定した職場",
          "同じ分野の経験を深められる環境"
        ],
        caution:
          "安定した業務の中でも、成長や役割の変化が得られるか確認しましょう。"
      },
      center: {
        title: "安定・変化バランス型",
        description:
          "安定した業務を基盤にしながら、新しい経験も取り入れたい傾向があります。",
        environments: [
          "定型業務と新しい課題がある職場"
        ],
        caution:
          "業務変更の頻度や、担当範囲を確認しましょう。"
      },
      right: {
        title: "変化・挑戦重視型",
        description:
          "さまざまな業務や新しい課題に取り組むことで、意欲を維持しやすい傾向があります。",
        environments: [
          "幅広い業務を経験できる職場",
          "新しい企画や役割に挑戦できる環境"
        ],
        caution:
          "変化の多さが過度な負担にならないか、業務量も確認しましょう。"
      }
    },

    learning: {
      name: "学習・教育環境",
      left: {
        title: "段階的な学習重視型",
        description:
          "見本や説明を通じて、段階的に仕事を覚えられる環境を好む傾向があります。",
        environments: [
          "研修や教育制度がある職場",
          "先輩に質問しやすい環境"
        ],
        caution:
          "研修終了後のフォロー体制も確認しましょう。"
      },
      center: {
        title: "指導・自学バランス型",
        description:
          "必要な指導を受けながら、自分でも調べて理解を深めたい傾向があります。",
        environments: [
          "指導と自主学習の機会がある職場"
        ],
        caution:
          "質問できる環境と、自主的に学ぶ時間の両方を確認しましょう。"
      },
      right: {
        title: "自主学習・実践重視型",
        description:
          "自分で情報を集め、実際に試しながら仕事を覚えることを好む傾向があります。",
        environments: [
          "試行錯誤が認められる職場",
          "自主的な学習を支援する環境"
        ],
        caution:
          "自主性を求める職場でも、必要な指導や安全管理があるか確認しましょう。"
      }
    },

    pace: {
      name: "成果の出し方",
      left: {
        title: "効率・スピード重視型",
        description:
          "必要な品質を確保しながら、テンポよく仕事を進めることを好む傾向があります。",
        environments: [
          "進捗や成果が見えやすい職場",
          "業務効率が評価される環境"
        ],
        caution:
          "速度だけでなく、品質や安全性も評価されるか確認しましょう。"
      },
      center: {
        title: "効率・品質バランス型",
        description:
          "仕事の速度と仕上がりの両方を考えながら、状況に応じて進めたい傾向があります。",
        environments: [
          "業務ごとに適切な基準がある職場"
        ],
        caution:
          "どのような基準で仕事が評価されるか確認しましょう。"
      },
      right: {
        title: "丁寧さ・品質重視型",
        description:
          "内容を十分に確認し、納得できる品質に仕上げることを好む傾向があります。",
        environments: [
          "正確さや品質が評価される職場",
          "落ち着いて作業できる環境"
        ],
        caution:
          "品質と納期のバランスが現実的か確認しましょう。"
      }
    },

    interaction: {
      name: "業務の対象",
      left: {
        title: "対人業務重視型",
        description:
          "人との会話や対応を通じて、直接的な反応を得られる仕事に関心を持ちやすい傾向があります。",
        environments: [
          "接客や顧客対応がある仕事",
          "人の相談や支援に関わる職場"
        ],
        caution:
          "対人業務の中でも、営業・接客・相談・調整では求められる対応が異なります。"
      },
      center: {
        title: "対人・実務バランス型",
        description:
          "人との関わりと、資料や情報を扱う実務の両方に関心を持ちやすい傾向があります。",
        environments: [
          "顧客対応と事務作業がある職場",
          "調整業務と実務を兼ねる仕事"
        ],
        caution:
          "それぞれの業務の割合を確認しましょう。"
      },
      right: {
        title: "情報・実務重視型",
        description:
          "資料、商品、データ、成果物などを扱い、仕事の結果を具体的な形で確認できる業務に関心を持ちやすい傾向があります。",
        environments: [
          "情報整理や制作に関わる仕事",
          "商品や設備を扱う実務的な職場"
        ],
        caution:
          "対人対応が少ない仕事でも、必要な報告や連携は発生します。"
      }
    }

  },

  /* ==========================================
     TEST 04 仕事の価値観診断
  ========================================== */

  values: {

    income: {
      name: "収入・待遇",
      description:
        "経済的な余裕や、希望する生活水準を実現できることを大切にしています。",
      check: [
        "基本給と手当の内訳",
        "賞与・昇給の実績",
        "固定残業代や変動給の条件",
        "実際の手取りと生活費"
      ],
      question:
        "希望する生活を実現するために、どの程度の収入が必要ですか？"
    },

    security: {
      name: "雇用の安定",
      description:
        "将来の見通しを持ちながら、安心して働き続けられることを大切にしています。",
      check: [
        "雇用形態と契約期間",
        "契約更新の条件",
        "事業の継続性",
        "社会保険や福利厚生"
      ],
      question:
        "あなたにとって、安心して働ける状態とはどのようなものですか？"
    },

    relationships: {
      name: "人間関係",
      description:
        "周囲と良好な関係を築き、安心してコミュニケーションを取れることを大切にしています。",
      check: [
        "職場の雰囲気",
        "上司とのコミュニケーション",
        "チームの人数と構成",
        "相談やフォローの体制"
      ],
      question:
        "どのような人たちと、どのような距離感で働きたいですか？"
    },

    growth: {
      name: "成長・スキル習得",
      description:
        "新しい経験や知識を得て、自分のできることを増やすことを大切にしています。",
      check: [
        "研修・教育制度",
        "実際に経験できる業務",
        "資格取得支援",
        "入社後のキャリアパス"
      ],
      question:
        "これから身につけたいスキルや、経験したい仕事はありますか？"
    },

    balance: {
      name: "生活との両立",
      description:
        "仕事だけでなく、家庭や趣味、自分自身の時間も大切にできる働き方を重視しています。",
      check: [
        "実際の勤務時間",
        "残業や休日出勤の頻度",
        "休日・休暇制度",
        "シフトや勤務時間の柔軟性"
      ],
      question:
        "仕事以外の時間を、どのように過ごしたいですか？"
    },

    location: {
      name: "勤務地・通勤",
      description:
        "生活圏とのつながりや、無理なく通勤できることを大切にしています。",
      check: [
        "自宅からの通勤時間",
        "乗り換えや混雑状況",
        "勤務地変更の可能性",
        "在宅勤務の可否"
      ],
      question:
        "通勤に使う時間や負担は、どの程度まで許容できますか？"
    },

    interest: {
      name: "仕事内容への興味",
      description:
        "興味や関心を持てる分野で、納得感を持って働くことを大切にしています。",
      check: [
        "具体的な仕事内容",
        "扱う商品やサービス",
        "日常業務の割合",
        "興味のある業務に関われる機会"
      ],
      question:
        "どのような仕事や分野なら、自然と興味を持って取り組めますか？"
    },

    contribution: {
      name: "社会・地域への貢献",
      description:
        "仕事を通じて誰かの役に立ち、社会や地域に価値を届けることを大切にしています。",
      check: [
        "事業の目的や理念",
        "顧客や地域との関係",
        "仕事が届ける価値",
        "成果を実感できる機会"
      ],
      question:
        "誰に、どのような価値を届ける仕事がしたいですか？"
    },

    freedom: {
      name: "裁量・自由度",
      description:
        "自分の考えや工夫を仕事に反映できることを大切にしています。",
      check: [
        "業務上の裁量範囲",
        "提案や改善の機会",
        "勤務方法の柔軟性",
        "意思決定の仕組み"
      ],
      question:
        "仕事の中で、どのようなことを自分で決められると嬉しいですか？"
    },

    recognition: {
      name: "評価・承認",
      description:
        "自分の努力や成果が適切に認められ、評価されることを大切にしています。",
      check: [
        "人事評価の基準",
        "昇給・昇進の条件",
        "フィードバックの頻度",
        "成果や取り組みの評価方法"
      ],
      question:
        "どのような評価や反応があると、仕事への意欲が高まりますか？"
    },

    future: {
      name: "将来の可能性",
      description:
        "今の仕事が、将来なりたい姿や新しいキャリアの選択肢につながることを大切にしています。",
      check: [
        "経験できる業務の幅",
        "キャリアアップの機会",
        "専門性や実績の蓄積",
        "将来像とのつながり"
      ],
      question:
        "3年後、5年後に、どのような自分になっていたいですか？"
    },

    wellbeing: {
      name: "心身のゆとり",
      description:
        "過度な負担を避け、自分らしいペースで働き続けられることを大切にしています。",
      check: [
        "業務量と人員体制",
        "職場の相談環境",
        "身体的な負担",
        "休憩や休暇の取りやすさ"
      ],
      question:
        "無理なく働き続けるために、どのような環境が必要ですか？"
    }

  },

  /* ==========================================
     職種・業務提案マスタ

     weights:
     強みの各評価軸との関連度

     3 = 関連が比較的強い
     2 = 関連がある
     1 = 補助的な関連

     risks:
     確認しておきたい負担要因

     ※職業適性の保証や採用判定には使用しない
  ========================================== */

  occupations: [

    {
      id: "sales_corporate",
      name: "法人営業",
      category: "営業",
      description: "企業の課題や要望を把握し、商品やサービスを提案する仕事。",
      weights: {
        communication: 3,
        analysis: 2,
        execution: 3,
        coordination: 2
      },
      risks: ["pressure", "conflict", "decision"],
      entry: "未経験可の求人もある",
      check: "営業方法・目標設定・研修体制"
    },
    {
      id: "sales_individual",
      name: "個人営業",
      category: "営業",
      description: "個人のお客様の希望を聞き、商品やサービスを提案する仕事。",
      weights: {
        communication: 3,
        empathy: 2,
        execution: 3,
        adaptability: 2
      },
      risks: ["pressure", "conflict"],
      entry: "未経験可の求人もある",
      check: "新規開拓の有無・評価制度・商品特性"
    },
    {
      id: "sales_existing",
      name: "ルート営業",
      category: "営業",
      description: "既存のお客様との関係を維持し、継続的な提案やフォローを行う仕事。",
      weights: {
        communication: 3,
        empathy: 2,
        coordination: 3,
        accuracy: 1
      },
      risks: ["multitask", "pressure"],
      entry: "未経験可の求人もある",
      check: "担当顧客数・訪問頻度・新規営業の割合"
    },
    {
      id: "inside_sales",
      name: "インサイドセールス",
      category: "営業",
      description: "電話やオンラインを通じて顧客と接点を持ち、商談につなげる仕事。",
      weights: {
        communication: 3,
        execution: 3,
        analysis: 2
      },
      risks: ["routine", "pressure", "conflict"],
      entry: "未経験可の求人もある",
      check: "架電件数・商談目標・業務ツール"
    },
    {
      id: "retail",
      name: "販売・接客スタッフ",
      category: "接客・サービス",
      description: "商品の案内や接客を通じて、お客様の買い物をサポートする仕事。",
      weights: {
        communication: 3,
        empathy: 3,
        adaptability: 2,
        execution: 1
      },
      risks: ["conflict", "multitask", "change"],
      entry: "未経験から始めやすい求人もある",
      check: "接客スタイル・立ち仕事・販売目標"
    },
    {
      id: "food_service",
      name: "飲食店ホールスタッフ",
      category: "飲食",
      description: "注文受付や配膳などを通じて、お客様の食事をサポートする仕事。",
      weights: {
        communication: 2,
        empathy: 2,
        execution: 3,
        adaptability: 3
      },
      risks: ["multitask", "pressure", "change"],
      entry: "未経験可・パート求人も多い職種",
      check: "繁忙時間・シフト・業務分担"
    },
    {
      id: "kitchen",
      name: "調理・キッチンスタッフ",
      category: "飲食",
      description: "調理や仕込み、衛生管理などを行い、料理を提供する仕事。",
      weights: {
        accuracy: 3,
        execution: 2,
        coordination: 2,
        adaptability: 1
      },
      risks: ["pressure", "multitask", "routine"],
      entry: "調理補助など未経験可の求人もある",
      check: "調理経験の要否・勤務時間・衛生管理"
    },
    {
      id: "store_management",
      name: "店舗運営・店長候補",
      category: "店舗運営",
      description: "売上管理、人員配置、接客品質など、店舗全体の運営に関わる仕事。",
      weights: {
        coordination: 3,
        execution: 3,
        communication: 2,
        analysis: 2,
        adaptability: 2
      },
      risks: ["multitask", "pressure", "decision", "change"],
      entry: "スタッフ経験から目指せる場合がある",
      check: "責任範囲・人員体制・勤務時間"
    },
    {
      id: "reception",
      name: "受付・案内スタッフ",
      category: "接客・サービス",
      description: "来訪者の受付や案内、問い合わせ対応などを行う仕事。",
      weights: {
        communication: 3,
        empathy: 3,
        accuracy: 2
      },
      risks: ["multitask", "conflict", "routine"],
      entry: "未経験可の求人もある",
      check: "来客数・電話対応・事務作業の割合"
    },
    {
      id: "customer_support",
      name: "カスタマーサポート",
      category: "顧客対応",
      description: "お客様からの問い合わせに対応し、問題解決を支援する仕事。",
      weights: {
        empathy: 3,
        communication: 3,
        analysis: 2,
        accuracy: 2
      },
      risks: ["conflict", "pressure", "multitask"],
      entry: "研修付きの未経験可求人もある",
      check: "問い合わせ内容・クレーム対応・相談体制"
    },
    {
      id: "customer_success",
      name: "カスタマーサクセス",
      category: "顧客対応",
      description: "顧客がサービスを活用し、目的を達成できるよう継続的に支援する仕事。",
      weights: {
        empathy: 3,
        communication: 3,
        analysis: 2,
        coordination: 2
      },
      risks: ["multitask", "decision", "pressure"],
      entry: "顧客対応や営業経験が求められる場合がある",
      check: "担当顧客数・支援範囲・目標設定"
    },
    {
      id: "general_office",
      name: "一般事務",
      category: "事務",
      description: "書類作成、データ入力、電話対応など、日常的な社内業務を支える仕事。",
      weights: {
        accuracy: 3,
        coordination: 2,
        analysis: 1
      },
      risks: ["detail", "routine", "multitask"],
      entry: "未経験可の求人もある",
      check: "PCスキル・電話対応・業務量"
    },
    {
      id: "sales_assistant",
      name: "営業事務",
      category: "事務",
      description: "受発注管理や顧客対応などを通じて、営業活動を支える仕事。",
      weights: {
        coordination: 3,
        accuracy: 3,
        communication: 2,
        adaptability: 1
      },
      risks: ["multitask", "detail", "pressure"],
      entry: "未経験可の求人もある",
      check: "受発注件数・営業担当者数・納期対応"
    },
    {
      id: "accounting",
      name: "経理・経理アシスタント",
      category: "事務",
      description: "売上や経費、入出金などの情報を管理し、会社のお金の流れを支える仕事。",
      weights: {
        accuracy: 3,
        analysis: 3
      },
      risks: ["detail", "routine", "pressure"],
      entry: "簿記や実務経験が必要な求人もある",
      check: "必要資格・月末月初の業務量・担当範囲"
    },
    {
      id: "hr_assistant",
      name: "人事・採用アシスタント",
      category: "事務・人材",
      description: "応募者対応や面接日程の調整、採用活動に関する事務を行う仕事。",
      weights: {
        coordination: 3,
        communication: 2,
        empathy: 2,
        accuracy: 3
      },
      risks: ["multitask", "detail", "change"],
      entry: "事務や接客経験を活かせる場合がある",
      check: "採用人数・担当業務・個人情報管理"
    },
    {
      id: "labor_assistant",
      name: "労務・総務アシスタント",
      category: "事務",
      description: "勤怠管理や社内手続き、備品管理など、会社の運営を支える仕事。",
      weights: {
        accuracy: 3,
        coordination: 3,
        analysis: 1
      },
      risks: ["detail", "multitask", "routine"],
      entry: "経験や専門知識が必要な求人もある",
      check: "労務知識の要否・業務範囲・繁忙期"
    },
    {
      id: "medical_office",
      name: "医療事務・クリニック受付",
      category: "医療・事務",
      description: "医療機関での受付、会計、書類管理などを行う仕事。",
      weights: {
        accuracy: 3,
        empathy: 2,
        communication: 2
      },
      risks: ["detail", "multitask", "pressure"],
      entry: "資格・経験の要否は求人によって異なる",
      check: "レセプト業務・患者対応・研修体制"
    },
    {
      id: "data_entry",
      name: "データ入力・書類チェック",
      category: "事務",
      description: "情報の入力や照合、書類の確認などを行う仕事。",
      weights: {
        accuracy: 3,
        analysis: 2
      },
      risks: ["detail", "routine", "pressure"],
      entry: "未経験可の求人もある",
      check: "入力件数・確認基準・作業環境"
    },
    {
      id: "staff_coordinator",
      name: "人材コーディネーター",
      category: "人材",
      description: "働く人と企業の間に立ち、仕事の紹介や調整、就業フォローを行う仕事。",
      weights: {
        communication: 3,
        empathy: 3,
        coordination: 3,
        execution: 2
      },
      risks: ["multitask", "conflict", "pressure"],
      entry: "未経験可の求人もある",
      check: "営業業務の割合・担当人数・就業フォロー"
    },
    {
      id: "school_support",
      name: "スクール運営・教育サポート",
      category: "教育",
      description: "受講者の対応や学習支援、教室運営などに関わる仕事。",
      weights: {
        empathy: 3,
        communication: 2,
        coordination: 3,
        accuracy: 1
      },
      risks: ["multitask", "conflict", "change"],
      entry: "職務内容によって経験や資格が必要",
      check: "指導業務の有無・対象年齢・勤務時間"
    },
    {
      id: "welfare_support",
      name: "福祉・生活支援スタッフ",
      category: "福祉",
      description: "利用者の日常生活や社会参加を支援する仕事。",
      weights: {
        empathy: 3,
        adaptability: 2,
        communication: 2,
        accuracy: 1
      },
      risks: ["change", "conflict", "multitask"],
      entry: "職種によって資格・研修が必要",
      check: "支援内容・身体的負担・資格要件"
    },
    {
      id: "event_operation",
      name: "イベント・催事運営",
      category: "運営",
      description: "イベントの準備、来場者対応、スタッフ連携などを行う仕事。",
      weights: {
        execution: 3,
        coordination: 3,
        adaptability: 3,
        communication: 2
      },
      risks: ["change", "multitask", "pressure"],
      entry: "未経験可の求人もある",
      check: "勤務場所・拘束時間・現場での責任範囲"
    },
    {
      id: "hotel",
      name: "ホテル・宿泊施設スタッフ",
      category: "接客・サービス",
      description: "宿泊者の受付や案内、施設運営に関わる仕事。",
      weights: {
        communication: 3,
        empathy: 3,
        adaptability: 2,
        accuracy: 2
      },
      risks: ["conflict", "multitask", "change"],
      entry: "未経験可の求人もある",
      check: "夜勤・語学要件・担当業務"
    },
    {
      id: "ec_operation",
      name: "ECサイト運営",
      category: "Web・事務",
      description: "商品登録、注文管理、販売促進など、オンラインショップの運営に関わる仕事。",
      weights: {
        accuracy: 3,
        analysis: 2,
        creativity: 2,
        coordination: 2
      },
      risks: ["detail", "multitask", "routine"],
      entry: "PC操作や運営経験が必要な場合がある",
      check: "商品登録・顧客対応・販促業務の割合"
    },
    {
      id: "sns",
      name: "SNS運用・広報アシスタント",
      category: "Web・クリエイティブ",
      description: "情報発信や投稿企画、反応の分析などを通じてサービスの認知を広げる仕事。",
      weights: {
        creativity: 3,
        communication: 2,
        analysis: 2,
        execution: 2
      },
      risks: ["pressure", "change", "decision"],
      entry: "制作実績や運用経験が必要な場合がある",
      check: "企画・制作・分析の担当範囲"
    },
    {
      id: "design_assistant",
      name: "デザイン・制作アシスタント",
      category: "クリエイティブ",
      description: "画像や資料などの制作を通じて、情報を分かりやすく表現する仕事。",
      weights: {
        creativity: 3,
        accuracy: 2,
        analysis: 1
      },
      risks: ["detail", "pressure", "change"],
      entry: "制作スキルやポートフォリオが必要な場合がある",
      check: "使用ツール・制作物・修正対応"
    },
    {
      id: "web_marketing",
      name: "Webマーケティングアシスタント",
      category: "Web・マーケティング",
      description: "広告やアクセスデータを確認し、集客や販売促進の改善を支える仕事。",
      weights: {
        analysis: 3,
        creativity: 2,
        execution: 2,
        accuracy: 2
      },
      risks: ["detail", "pressure", "decision"],
      entry: "基礎知識や実務経験が必要な場合がある",
      check: "分析ツール・数値目標・担当媒体"
    },
    {
      id: "planning_assistant",
      name: "企画・商品開発アシスタント",
      category: "企画",
      description: "市場調査やアイデアの整理、商品やサービスの企画を支える仕事。",
      weights: {
        creativity: 3,
        analysis: 3,
        coordination: 2,
        execution: 1
      },
      risks: ["ambiguity", "decision", "multitask"],
      entry: "関連業務の経験が必要な場合がある",
      check: "企画への関与範囲・必要経験"
    },
    {
      id: "logistics_office",
      name: "物流事務・在庫管理",
      category: "物流",
      description: "商品の入出庫や在庫情報を管理し、物流業務を支える仕事。",
      weights: {
        accuracy: 3,
        coordination: 3,
        analysis: 2
      },
      risks: ["detail", "multitask", "pressure"],
      entry: "未経験可の求人もある",
      check: "使用システム・現場作業の有無"
    },
    {
      id: "warehouse",
      name: "倉庫・軽作業スタッフ",
      category: "物流",
      description: "商品の仕分け、検品、梱包などを行う仕事。",
      weights: {
        accuracy: 3,
        execution: 2,
        coordination: 1
      },
      risks: ["routine", "detail", "pressure"],
      entry: "未経験可・パート求人も多い職種",
      check: "身体的負担・作業速度・勤務環境"
    },
    {
      id: "manufacturing",
      name: "製造・検品スタッフ",
      category: "製造",
      description: "製品の加工、組立、検品など、製造工程を担う仕事。",
      weights: {
        accuracy: 3,
        execution: 2,
        analysis: 1
      },
      risks: ["routine", "detail", "pressure"],
      entry: "未経験可の求人もある",
      check: "作業工程・安全管理・勤務時間"
    },
    {
      id: "quality_control",
      name: "品質管理アシスタント",
      category: "製造・管理",
      description: "製品や業務が定められた基準を満たしているか確認する仕事。",
      weights: {
        accuracy: 3,
        analysis: 3,
        coordination: 1
      },
      risks: ["detail", "routine", "pressure"],
      entry: "専門知識や経験が必要な場合がある",
      check: "検査基準・必要資格・担当工程"
    },
    {
      id: "it_support",
      name: "ITサポート・ヘルプデスク",
      category: "IT",
      description: "PCやシステムに関する問い合わせに対応し、問題解決を支援する仕事。",
      weights: {
        analysis: 3,
        empathy: 2,
        communication: 2,
        adaptability: 2
      },
      risks: ["multitask", "conflict", "change"],
      entry: "基礎的なIT知識が必要な場合がある",
      check: "必要知識・問い合わせ件数・研修体制"
    },
    {
      id: "it_test",
      name: "システム・アプリのテスター",
      category: "IT",
      description: "システムの動作を確認し、不具合や問題点を記録する仕事。",
      weights: {
        accuracy: 3,
        analysis: 3
      },
      risks: ["detail", "routine"],
      entry: "未経験可の求人もある",
      check: "テスト方法・必要知識・作業内容"
    },
    {
      id: "project_assistant",
      name: "プロジェクト進行アシスタント",
      category: "運営・管理",
      description: "スケジュールや関係者の情報を整理し、プロジェクトの進行を支える仕事。",
      weights: {
        coordination: 3,
        execution: 2,
        accuracy: 2,
        adaptability: 2
      },
      risks: ["multitask", "change", "pressure"],
      entry: "事務や進行管理経験が必要な場合がある",
      check: "担当案件数・責任範囲・連携体制"
    },
    {
      id: "facility",
      name: "施設管理・運営スタッフ",
      category: "運営・サービス",
      description: "施設の利用者対応や設備確認、日常的な運営を支える仕事。",
      weights: {
        coordination: 2,
        accuracy: 2,
        adaptability: 3,
        execution: 2
      },
      risks: ["change", "decision", "multitask"],
      entry: "担当業務によって資格が必要",
      check: "設備管理の範囲・緊急対応・勤務時間"
    },
    {
      id: "beauty",
      name: "美容・サロン受付スタッフ",
      category: "美容・サービス",
      description: "来店者の受付や予約管理、サービス案内などを行う仕事。",
      weights: {
        communication: 3,
        empathy: 3,
        coordination: 2,
        accuracy: 1
      },
      risks: ["multitask", "conflict", "pressure"],
      entry: "未経験可の求人もある",
      check: "販売目標・施術業務の有無・資格要件"
    },
    {
      id: "cleaning",
      name: "清掃・環境整備スタッフ",
      category: "サービス",
      description: "施設や店舗などの環境を清潔に保ち、利用者が快適に過ごせるよう支える仕事。",
      weights: {
        accuracy: 3,
        execution: 2
      },
      risks: ["routine", "pressure"],
      entry: "未経験可・パート求人も多い職種",
      check: "身体的負担・作業範囲・勤務時間"
    }

  ],

  /* ==========================================
     キャリアカルテ入力項目
  ========================================== */

  profile: {

    employmentStatus: [
      "正社員として就業中",
      "契約社員として就業中",
      "派遣社員として就業中",
      "パート・アルバイトとして就業中",
      "自営業・フリーランス",
      "学生",
      "離職中・求職中",
      "その他",
      "回答しない"
    ],

    ageGroups: [
      "18歳未満",
      "18〜24歳",
      "25〜29歳",
      "30〜34歳",
      "35〜39歳",
      "40〜49歳",
      "50〜59歳",
      "60歳以上",
      "回答しない"
    ],

    goals: [
      "収入を増やして経済的に余裕を持ちたい",
      "専門的な知識やスキルを身につけたい",
      "将来的に独立・起業したい",
      "好きなことや興味のあることを仕事にしたい",
      "仕事とプライベートを両立したい",
      "自宅の近くで穏やかに働きたい",
      "人の役に立つ仕事がしたい",
      "地域に関わる仕事がしたい",
      "自分に自信を持てるようになりたい",
      "新しい仕事や環境に挑戦したい",
      "安定した生活を送りたい",
      "これからの選択肢を増やしたい",
      "まだ具体的には決まっていない"
    ],

    employmentTypes: [
      "正社員",
      "契約社員",
      "派遣社員",
      "パート・アルバイト",
      "業務委託",
      "こだわらない",
      "まだ決まっていない"
    ],

    areaPreferences: [
      "東西線・直通沿線を希望",
      "沿線を希望するが、条件次第で他のエリアも検討したい",
      "勤務地より仕事内容や待遇を重視したい",
      "在宅勤務・リモートワークも検討したい",
      "まだ決まっていない"
    ],

    timing: [
      "できるだけ早く転職・就職したい",
      "3か月以内を目安に考えている",
      "半年以内を目安に考えている",
      "1年以内を目安に考えている",
      "良い仕事があれば検討したい",
      "今は転職する予定はない",
      "まだ決まっていない"
    ],

    concerns: [
      "自分に向いている仕事が分からない",
      "今後のキャリアに不安がある",
      "自分の強みが分からない",
      "今の職場環境が合っていないと感じる",
      "給与や待遇を改善したい",
      "仕事と生活を両立したい",
      "通勤時間や勤務地を見直したい",
      "未経験の仕事に挑戦したい",
      "ブランクからの復職を考えている",
      "将来の目標を整理したい",
      "特に悩みはないが自己分析したい"
    ],

    consultationTopics: [
      "診断結果について詳しく相談したい",
      "自分に合う仕事の選択肢を知りたい",
      "具体的な求人を紹介してほしい",
      "今の仕事を続けるか悩んでいる",
      "将来のキャリアについて相談したい",
      "履歴書や面接について相談したい",
      "まずは情報収集したい"
    ]

  },

  /* ==========================================
     結果表示・注意事項
  ========================================== */

  labels: {

    strength: [
      { min: 80, label: "強く表れている傾向" },
      { min: 60, label: "比較的表れている傾向" },
      { min: 40, label: "中程度の傾向" },
      { min: 20, label: "現時点では控えめな傾向" },
      { min: 0, label: "回答上は控えめな傾向" }
    ],

    difficulty: [
      { min: 80, label: "負担を強く感じやすい" },
      { min: 60, label: "比較的負担を感じやすい" },
      { min: 40, label: "状況によって負担を感じる" },
      { min: 20, label: "比較的負担を感じにくい" },
      { min: 0, label: "回答上は負担を感じにくい" }
    ],

    values: [
      { min: 100, label: "とても大切" },
      { min: 75, label: "大切" },
      { min: 50, label: "ある程度大切" },
      { min: 25, label: "優先度は低い" },
      { min: 0, label: "ほとんど重視しない" }
    ]

  },

  notices: {

    score:
      "スコアは回答を0〜100の範囲に換算したものです。能力の絶対評価や、他の利用者との比較を示す偏差値ではありません。",

    unknown:
      "経験がなく判断できない回答は採点対象から除外します。回答が少ない項目については、十分な傾向を判断できない場合があります。",

    strength:
      "スコアが低い項目も、能力がないことを意味するものではありません。経験や環境によって、発揮される強みは変化します。",

    difficulty:
      "苦手なことは、必ずしも克服しなければならないものではありません。受け入れること、工夫すること、環境を選ぶことも大切な選択肢です。",

    workstyle:
      "働き方の好みと、実際の業務能力は異なります。どちらの働き方が優れているというものではありません。",

    values:
      "仕事に求める価値観は、生活環境や人生の段階によって変化することがあります。現在の自分の希望として参考にしてください。",

    occupations:
      "表示される職種は、回答から見える強みと業務特性の関連をもとにした参考情報です。実際の適性、採用可能性、求人の有無を保証するものではありません。資格や経験が必要な職種も含まれます。",

    consultation:
      "診断結果はキャリアを考えるための出発点です。経験や将来像、希望条件を踏まえて、面談で一緒に考えていきましょう。",

    privacy:
      "診断結果と入力内容は、原則として利用中のブラウザ内に保存されます。LINEなどで共有する場合は、送信前に内容を確認してください。",

    validation:
      "本診断は沿線キャリア独自の自己分析ツールです。標準化された心理検査や、科学的妥当性が検証された職業適性検査ではありません。"

  }

};
