$(document).ready(function () {
  const tabContainer = document.getElementById("tab-container");
  const tab1Button = document.getElementById("tab1");
  const tab2Button = document.getElementById("tab2");
  const mainTable = document.getElementById("main-table");
  const returnTable = document.getElementById("return-table");
  const displayBothCheckbox = document.getElementById("return-trip");
  const formcont = document.getElementById("form-container");
  const traininfocont = document.getElementById("train-info");
  const progressbar = document.getElementById("progress-bar");
  const modifybtncont = document.getElementById("modi-btn");
  const modify_button = document.getElementById("modify-btn");
  var main_rowsAdded = false;
  var ret_rowsAdded = false;
  const finalbtn = document.getElementById("final-proceed-btn");   

  // List of stations 
  var stations = [
    "Colombo Fort",
    "Kandy",
    "Habarana",
    "Eliphant Pass",
    "Hikkaduwa",
    "Aluthgama",
    "Medawachchiya",
    "Galgamuwa",
    "Galle",
    "Matara",
    "Mount Lavinia",
    "Jaffna",
    "Anuradhapura",
    "Maradana",
    "Badulla",
    "Haputale",
    "Batticaloa",
    "Trincomalee",
    "Kurunegala",
    "Gampaha",
    "Maho",
    "Rambukkana",
    "Vavuniya",
    "Ragama",
    "Veyangoda",
    "Polgahawela",
    "Kalutara South",
    "Polonnaruwa",
    "Peradeniya",
    "Beliaththa",
    "Ambalangoda",
    "Kilinochchi",
    "Kankesanthurai",
    "Ella",
    "Nanuoya",
    "Hatton",
    "Watawala",
    "Idalgashinna",
    "Galoya Junction",
  ];

  
  $("#start-station, #end-station")
    .autocomplete({
      source: function (request, response) {
        var results = $.ui.autocomplete.filter(stations, request.term);

        results = results.sort(function (a, b) {
          if (
            a.toLowerCase().startsWith(request.term.toLowerCase()) &&
            !b.toLowerCase().startsWith(request.term.toLowerCase())
          ) {
            return -1;
          }
          if (
            !a.toLowerCase().startsWith(request.term.toLowerCase()) &&
            b.toLowerCase().startsWith(request.term.toLowerCase())
          ) {
            return 1;
          }
          return 0;
        });

        response(results);
      },
      minLength: 0,
      open: function () {
        $(".ui-autocomplete").css("z-index", 1000);
      },
    })
    .focus(function () {
      $(this).autocomplete("search", "");
    });

    
    /* Arrays which are used to store the stoping stations, arrival time, depature
      time and stop of trains at those stations They are linked to relevant train objects.*/
  const trainData1 = [
    ["Colombo Fort", "05.55", "05.55", "-"],
    ["Ragama", "06:16", "06:18", "2 minutes"],
    ["Gampaha", "06:30", "06:31", "1 minute"],
    ["Veyangoda", "06:41", "06:43", "2 minutes"],
    ["Mirigama", "06:54", "06:55", "1 minute"],
    ["Polgahawela", "07:15", "07:17", "2 minutes"],
    ["Rambukkana", "07:28", "07:31", "3 minutes"],
    ["Kadigamuwa", "07:42", "07:43", "1 minute"],
    ["Ihalakotte", "07:53", "07:54", "1 minute"],
    ["Balana", "08:04", "08:05", "1 minute"],
    ["Kadugannawa", "08:13", "08:14", "1 minute"],
    ["Pilimatalawa", "08:20", "08:25", "5 minutes"],
    ["Kandy", "08:46", "08:57", "9 minutes"],
    ["Peradeniya", "08:56", "08:57", "1 minute"],
    ["Geli Oya", "09:14", "09:15", "1 minute"],
    ["Gampola", "09:27", "09:39", "12 minutes"],
    ["Tembiligala", "09:45", "09:46", "1 minute"],
    ["Ulapane", "09:53", "09:54", "1 minute"],
    ["Nawalapitiya", "10:08", "10:12", "4 minutes"],
    ["Inguruoya", "10:23", "10:24", "1 minute"],
    ["Galaboda", "10:35", "10:36", "1 minute"],
    ["Watawala", "10:53", "10:54", "1 minute"],
    ["Ihalawatawala", "10:59", "11:00", "1 minute"],
    ["Rozella", "11:08", "11:09", "1 minute"],
    ["Hatton", "11:23", "11:25", "2 minutes"],
    ["Kotagala", "11:35", "11:36", "1 minute"],
    ["Talawakele", "11:50", "11:52", "2 minutes"],
    ["Watagoda", "12:06", "12:07", "1 minute"],
    ["Great Western", "12:17", "12:22", "5 minutes"],
    ["Radella", "12:30", "12:31", "1 minute"],
    ["Nanuoya", "12:39", "12:45", "6 minutes"],
    ["Parakumpura", "12:56", "12:57", "1 minute"],
    ["Ambewela", "13:16", "13:17", "1 minute"],
    ["Pattipola", "13:24", "13:25", "1 minute"],
    ["Ohiya", "13:38", "13:39", "1 minute"],
    ["Idalgashinna", "13:56", "14:07", "11 minutes"],
    ["Haputale", "14:21", "14:22", "1 minute"],
    ["Diyatalawa", "14:32", "14:34", "2 minutes"],
    ["Bandarawela", "14:46", "14:48", "2 minutes"],
    ["Kinigama", "14:53", "14:54", "1 minute"],
    ["Heel Oya", "15:02", "15:03", "1 minute"],
    ["Kital Ella", "15:11", "15:12", "1 minute"],
    ["Ella", "15:17", "15:19", "2 minutes"],
    ["Demodara", "15:32", "15:33", "1 minute"],
    ["Uduwara", "15:41", "15:42", "1 minute"],
    ["Hali Ela", "15:50", "15:51", "1 minute"],
    ["Badulla", "16.07", "-", "-"],
  ];

  const trainData2 = [
    ["Trincomalee", "07:00 pm", "07:00 pm", "-"],
    ["China Bey", "07:10 pm", "07:12 pm", "2 minutes"],
    ["Thampalakamam", "07:34 pm", "07:35 pm", "1 minute"],
    ["Mollipatana", "07:48 pm", "07:49 pm", "1 minute"],
    ["Kantale", "08:06 pm", "08:09 pm", "3 minutes"],
    ["Akbopura", "08:16 pm", "08:20 pm", "4 minutes"],
    ["Galoya Junction", "08:50 pm", "09:10 pm", "20 minutes"],
    ["Habarana", "09:30 pm", "09:31 pm", "1 minute"],
    ["Palugaswewa", "09:42 pm", "09:43 pm", "1 minute"],
    ["Horiwiala", "09:49 pm", "09:50 pm", "1 minute"],
    ["Kekirawa", "10:05 pm", "10:07 pm", "2 minutes"],
    ["Kalawewa", "10:21 pm", "10:22 pm", "1 minute"],
    ["Aukana", "10:28 pm", "10:29 pm", "1 minute"],
    ["Moragollagama", "10:51 pm", "10:52 pm", "1 minute"],
    ["Konwewa", "11:06 pm", "11:07 pm", "1 minute"],
    ["Maho", "11:25 pm", "12:00 am (Next Day)", "35 minutes"],
    ["Nagollagama", "12:11 am", "12:25 am", "14 minutes"],
    ["Ganewatte", "12:41 am", "12:42 am", "1 minute"],
    ["Wellawa", "12:56 am", "12:57 am", "1 minute"],
    ["Kurunegala", "01:09 am", "01:11 am", "2 minutes"],
    ["Potuhera", "01:25 am", "01:26 am", "1 minute"],
    ["Polgahawela", "01:46 am", "01:50 am", "4 minutes"],
    ["Mirigama", "02:16 am", "02:17 am", "1 minute"],
    ["Veyangoda", "02:30 am", "02:33 am", "3 minutes"],
    ["Gampaha", "02:45 am", "02:48 am", "3 minutes"],
    ["Ragama", "03:00 am", "03:03 am", "3 minutes"],
    ["Maradana", "03:21 am", "03:25 am", "4 minutes"],
    ["Colombo Fort", "03:30 am", "03:30 am", "-"],
  ];

  const trainData3 = [
    ["Colombo Fort", "10:30 am", "10:30 am", "-"],
    ["Mount Lavinia", "10:45 am", "10:46 am", "1 minute"],
    ["Kalutara South", "11:27 am", "11:28 am", "1 minute"],
    ["Aluthgama", "11:48 am", "11:50 am", "2 minutes"],
    ["Ambalangoda", "12:11 pm", "12:12 pm", "1 minute"],
    ["Hikkaduwa", "12:22 pm", "12:23 pm", "1 minute"],
    ["Galle", "12:42 pm", "01:00 pm", "18 minutes"],
    ["Thalpe", "01:10 pm", "01:11 pm", "1 minute"],
    ["Koggala", "01:15 pm", "01:16 pm", "1 minute"],
    ["Ahangama", "01:20 pm", "01:21 pm", "1 minute"],
    ["Weligama", "01:31 pm", "01:32 pm", "1 minute"],
    ["Kamburugamuwa", "01:40 pm", "01:48 pm", "8 minutes"],
    ["Matara", "01:54 pm", "02:00 pm", "6 minutes"],
    ["Piladuwa", "02:02 pm", "02:03 pm", "1 minute"],
    ["Weherahena", "02:06 pm", "02:07 pm", "1 minute"],
    ["Kakanadura", "02:10 pm", "02:11 pm", "1 minute"],
    ["Bambaranda", "02:18 pm", "02:19 pm", "1 minute"],
    ["Wewurukannala", "02:24 pm", "02:25 pm", "1 minute"],
    ["Beliaththa", "02:35 pm", "02:35 pm", "-"],
  ];
  const trainData4 = [
    ["Badulla", "-", "08:30", "-"],
    ["Hali Ela", "08:45", "08:46", "1 minute"],
    ["Uduwara", "08:54", "08:55", "1 minute"],
    ["Demodara", "09:08", "09:09", "1 minute"],
    ["Ella", "09:23", "09:24", "1 minute"],
    ["Kital Ella", "09:29", "09:30", "1 minute"],
    ["Heel Oya", "09:38", "09:39", "1 minute"],
    ["Kinigama", "09:48", "09:49", "1 minute"],
    ["Bandarawela", "09:55", "09:57", "3 minutes"],
    ["Diyatalawa", "10:11", "10:12", "1 minute"],
    ["Haputale", "10:24", "10:26", "2 minutes"],
    ["Idalgashinna", "10:43", "10:44", "1 minute"],
    ["Ohiya", "11:03", "11:04", "1 minute"],
    ["Pattipola", "11:19", "11:20", "1 minute"],
    ["Ambewela", "11:27", "11:28", "1 minute"],
    ["Parakumpura", "11:47", "11:48", "1 minute"],
    ["Nanuoya", "11:58", "12:03", "5 minutes"],
    ["Radella", "12:11", "12:12", "1 minute"],
    ["Great Western", "12:20", "12:21", "1 minute"],
    ["Watagoda", "12:31", "12:32", "1 minute"],
    ["Talawakele", "12:46", "12:48", "2 minutes"],
    ["Kotagala", "13:02", "13:03", "1 minute"],
    ["Hatton", "13:13", "13:24", "11 minutes"],
    ["Rozella", "13:38", "13:39", "1 minute"],
    ["Ihalawatawala", "13:48", "13:49", "1 minute"],
    ["Watawala", "13:54", "14:10", "16 minutes"],
    ["Galaboda", "14:27", "14:28", "1 minute"],
    ["Inguru Oya", "14:39", "14:40", "1 minute"],
    ["Nawalapitiya", "14:51", "14:55", "4 minutes"],
    ["Ulapane", "15:07", "15:08", "1 minute"],
    ["Tembiligala", "15:14", "15:15", "1 minute"],
    ["Gampola", "15:22", "15:23", "1 minute"],
    ["Kandy", "15:53", "16:00", "7 minutes"],
    ["Sarasavi Uyana", "16:07", "16:08", "1 minute"],
    ["Peradeniya", "16:10", "16:11", "1 minute"],
    ["Pilimatalawa", "16:19", "16:20", "1 minute"],
    ["Kadugannawa", "16:27", "16:28", "1 minute"],
    ["Ihalakotte", "16:50", "16:51", "1 minute"],
    ["Kadigamuwa", "17:02", "17:12", "10 minutes"],
    ["Rambukkana", "17:23", "17:26", "3 minutes"],
    ["Polgahawela", "17:37", "17:39", "2 minutes"],
    ["Veyangoda", "18:09", "18:11", "2 minutes"],
    ["Gampaha", "18:22", "18:23", "1 minute"],
    ["Ragama", "18:34", "18:35", "1 minute"],
    ["Maradana", "18:51", "-", "-"],
    ["Colombo Fort", "18:57", "-", "-"],
  ];

  const trainData5 = [
    ["Mount Lavinia", "05:55 am", "05:55 am", "-"],
    ["Dehiwala", "05:59 am", "06:00 am", "1 minute"],
    ["Wellawatta", "06:05 am", "06:06 am", "1 minute"],
    ["Bambalapitiya", "06:10 am", "06:11 am", "1 minute"],
    ["Colombo Fort", "06:19 am", "06:35 am", "16 minutes"],
    ["Ragama", "06:56 am", "06:57 am", "1 minute"],
    ["Gampaha", "07:09 am", "07:10 am", "1 minute"],
    ["Polgahawela", "07:57 am", "08:02 am", "5 minutes"],
    ["Kurunegala", "08:30 am", "08:31 am", "1 minute"],
    ["Maho", "09:17 am", "09:18 am", "1 minute"],
    ["Galgamuwa", "09:43 am", "09:44 am", "1 minute"],
    ["Thambuttegama", "10:06 am", "10:07 am", "1 minute"],
    ["Talawa", "10:19 am", "10:20 am", "1 minute"],
    ["Anuradhapura Town", "10:34 am", "10:35 am", "1 minute"],
    ["Anuradhapura", "10:40 am", "10:45 am", "5 minutes"],
    ["Parasangahawewa", "11:00 am", "11:01 am", "1 minute"],
    ["Medawachchiya", "11:17 am", "11:18 am", "1 minute"],
    ["Vavuniya", "11:46 am", "11:48 am", "2 minutes"],
    ["Thandikulam", "11:52 am", "11:53 am", "1 minute"],
    ["Omanthai", "12:04 pm", "12:13 pm", "9 minutes"],
    ["Puliyankulam", "12:24 pm", "12:25 pm", "1 minute"],
    ["Mankulam", "12:44 pm", "12:45 pm", "1 minute"],
    ["Kilinochchi", "01:14 pm", "01:16 pm", "2 minutes"],
    ["Paranthan", "01:21 pm", "01:22 pm", "1 minute"],
    ["Pallai", "01:43 pm", "01:44 pm", "1 minute"],
    ["Kodikamam", "01:57 pm", "01:58 pm", "1 minute"],
    ["Sankathanai", "02:06 pm", "02:07 pm", "1 minute"],
    ["Chavakachcheri", "02:09 pm", "02:11 pm", "2 minutes"],
    ["Navatkuli", "02:19 pm", "02:20 pm", "1 minute"],
    ["Punkankulam", "02:25 pm", "02:26 pm", "1 minute"],
    ["Jaffna", "02:29 pm", "02:40 pm", "11 minutes"],
    ["Kokuvil", "02:44 pm", "02:45 pm", "1 minute"],
    ["Kondavil", "02:48 pm", "02:49 pm", "1 minute"],
    ["Inuvil", "02:53 pm", "02:54 pm", "1 minute"],
    ["Chunnakam", "02:57 pm", "02:58 pm", "1 minute"],
    ["Mallakam", "03:01 pm", "03:02 pm", "1 minute"],
    ["Tellipallai", "03:06 pm", "03:07 pm", "1 minute"],
    ["Mavittapuram", "03:10 pm", "03:11 pm", "1 minute"],
    ["Kankesanthurai", "03:15 pm", "03:15 pm", "-"],
];
const trainData6 = [
  ["Colombo Fort", "08:00 pm", "08:00 pm", "-"],
  ["Polgahawela", "09:19 pm", "09:22 pm", "3 minutes"],
  ["Kurunegala", "09:53 pm", "09:55 pm", "2 minutes"],
  ["Maho", "10:44 pm", "10:50 pm", "6 minutes"],
  ["Galgamuwa", "11:17 pm", "11:18 pm", "1 minute"],
  ["Thambuttegama", "11:41 pm", "11:53 pm", "12 minutes"],
  ["Anuradhapura", "12:25 am", "12:30 am", "5 minutes"],
  ["Medawachchiya", "01:05 am", "01:07 am", "2 minutes"],
  ["Poonewa", "01:15 am", "01:16 am", "1 minute"],
  ["Erattaperiyakulam", "01:30 am", "01:31 am", "1 minute"],
  ["Vavuniya", "01:39 am", "01:40 am", "1 minute"],
  ["Thandikulam", "01:44 am", "01:45 am", "1 minute"],
  ["Omanthai", "01:58 am", "01:59 am", "1 minute"],
  ["Puliyankulam", "02:10 am", "02:11 am", "1 minute"],
  ["Mankulam", "02:30 am", "02:31 am", "1 minute"],
  ["Murikandy", "02:47 am", "02:48 am", "1 minute"],
  ["Kilinochchi", "03:02 am", "03:03 am", "1 minute"],
  ["Paranthan", "03:09 am", "03:10 am", "1 minute"],
  ["Eliphant Pass", "03:18 am", "03:19 am", "1 minute"],
  ["Pallai", "03:35 am", "03:36 am", "1 minute"],
  ["Eluthumattuval", "03:44 am", "03:45 am", "1 minute"],
  ["Mirusuvil", "03:51 am", "03:52 am", "1 minute"],
  ["Kodikamam", "03:56 am", "03:57 am", "1 minute"],
  ["Sankathanai", "04:05 am", "04:06 am", "1 minute"],
  ["Chavakachcheri", "04:09 am", "04:18 am", "9 minutes"],
  ["Thachanthoppu", "04:24 am", "04:25 am", "1 minute"],
  ["Navatkuli", "04:28 am", "04:29 am", "1 minute"],
  ["Punkankulam", "04:35 am", "04:36 am", "1 minute"],
  ["Jaffna", "04:39 am", "04:45 am", "6 minutes"],
  ["Kokuvil", "04:48 am", "04:49 am", "1 minute"],
  ["Kondavil", "04:52 am", "04:53 am", "1 minute"],
  ["Inuvil", "04:57 am", "04:58 am", "1 minute"],
  ["Chunnakam", "05:02 am", "05:03 am", "1 minute"],
  ["Mallakam", "05:06 am", "05:07 am", "1 minute"],
  ["Tellipallai", "05:10 am", "05:11 am", "1 minute"],
  ["Mavittapuram", "05:14 am", "05:15 am", "1 minute"],
  ["Kankesanthurai", "05:19 am", "05:19 am", "-"],
];



const trainData7 = [
  ["Colombo Fort", "06:05 am", "06:05 am", "-"],
  ["Maradana", "06:09 am", "06:10 am", "1 minute"],
  ["Ragama", "06:26 am", "06:27 am", "1 minute"],
  ["Gampaha", "06:40 am", "06:41 am", "1 minute"],
  ["Veyangoda", "06:51 am", "06:52 am", "1 minute"],
  ["Mirigama", "07:04 am", "07:05 am", "1 minute"],
  ["Polgahawela", "07:28 am", "07:32 am", "4 minutes"],
  ["Potuhera", "07:47 am", "07:48 am", "1 minute"],
  ["Kurunegala", "07:58 am", "07:59 am", "1 minute"],
  ["Muththettugala", "08:02 am", "08:03 am", "1 minute"],
  ["Wellawa", "08:11 am", "08:12 am", "1 minute"],
  ["Ganewatte", "08:24 am", "08:29 am", "5 minutes"],
  ["Nagollagama", "08:43 am", "08:44 am", "1 minute"],
  ["Maho", "08:55 am", "09:15 am", "20 minutes"],
  ["Konwewa", "09:31 am", "09:32 am", "1 minute"],
  ["Moragollagama", "09:46 am", "09:48 am", "2 minutes"],
  ["Siyalangamuwa", "09:55 am", "09:56 am", "1 minute"],
  ["Aukana", "10:10 am", "10:11 am", "1 minute"],
  ["Kalawewa", "10:17 am", "10:29 am", "12 minutes"],
  ["Kekirawa", "10:43 am", "10:44 am", "1 minute"],
  ["Horiwiala", "10:57 am", "10:58 am", "1 minute"],
  ["Palugaswewa", "11:04 am", "11:05 am", "1 minute"],
  ["Habarana", "11:16 am", "11:17 am", "1 minute"],
  ["Galoya Junction", "11:36 am", "11:45 am", "9 minutes"],
  ["Hingurakgoda", "12:07 pm", "12:08 pm", "1 minute"],
  ["Polonnaruwa", "12:30 pm", "12:32 pm", "2 minutes"],
  ["Manampitiya", "12:46 pm", "12:48 pm", "2 minutes"],
  ["Sevanapitiya", "12:57 pm", "12:58 pm", "1 minute"],
  ["Welikanda", "01:10 pm", "01:11 pm", "1 minute"],
  ["Punani", "01:35 pm", "01:36 pm", "1 minute"],
  ["Valachchenei", "01:58 pm", "02:00 pm", "2 minutes"],
  ["Eravur", "02:24 pm", "02:26 pm", "2 minutes"],
  ["Batticaloa", "02:45 pm", "02:45 pm", "-"],
];
const trainData8 = [
  ["Matara", "06:05 am", "06:05 am", "-"],
  ["Weligama", "06:20 am", "06:21 am", "1 minute"],
  ["Ahangama", "06:30 am", "06:31 am", "1 minute"],
  ["Habaraduwa", "06:38 am", "06:39 am", "1 minute"],
  ["Galle", "06:53 am", "07:03 am", "10 minutes"],
  ["Hikkaduwa", "07:20 am", "07:22 am", "2 minutes"],
  ["Ambalangoda", "07:33 am", "07:34 am", "1 minute"],
  ["Kosgoda", "07:46 am", "07:44 am", "-2 minutes"],
  ["Aluthgama", "07:58 am", "08:00 am", "2 minutes"],
  ["Kalutara South", "08:19 am", "08:21 am", "2 minutes"],
  ["Colombo Fort", "09:16 am", "09:18 am", "2 minutes"],
  ["Maradana", "09:23 am", "09:23 am", "-"],
];
const trainData9 = [
  ["Colombo Fort", "05:30 am", "05:30 am", "-"],
  ["Gampaha", "06:00 am", "06:01 am", "1 minute"],
  ["Polgahawela", "06:45 am", "06:46 am", "1 minute"],
  ["Rambukkana", "06:56 am", "06:58 am", "2 minutes"],
  ["Kadigamuwa", "07:08 am", "07:13 am", "5 minutes"],
  ["Ihalakotte", "07:23 am", "07:29 am", "6 minutes"],
  ["Nawalapitiya", "09:18 am", "09:23 am", "5 minutes"],
  ["Hatton", "10:35 am", "10:38 am", "3 minutes"],
  ["Great Western", "11:40 am", "11:44 am", "4 minutes"],
  ["Nanuoya", "12:02 pm", "12:07 pm", "5 minutes"],
  ["Ohiya", "01:02 pm", "01:07 pm", "5 minutes"],
  ["Idalgasinna", "01:25 pm", "01:35 pm", "10 minutes"],
  ["Haputale", "01:52 pm", "01:53 pm", "1 minute"],
  ["Diyatalawa", "02:02 pm", "02:05 pm", "3 minutes"],
  ["Bandarawela", "02:17 pm", "02:19 pm", "2 minutes"],
  ["Ella", "02:47 pm", "02:50 pm", "3 minutes"],
  ["Demodara", "03:15 pm", "03:25 pm", "10 minutes"],
  ["Haliela", "03:47 pm", "03:48 pm", "1 minute"],
  ["Badulla", "04:01 pm", "04:01 pm", "-"],
];
const trainData10 = [
  ["Colombo Fort", "03:05 pm", "03:05 pm", "-"],
  ["Polgahawela", "04:08 pm", "04:09 pm", "1 minute"],
  ["Kurunegala", "04:32 pm", "04:33 pm", "1 minute"],
  ["Maho", "05:12 pm", "05:20 pm", "8 minutes"],
  ["Kalawewa", "06:05 pm", "06:06 pm", "1 minute"],
  ["Kekirawa", "06:16 pm", "06:17 pm", "1 minute"],
  ["Habarana", "06:42 pm", "06:43 pm", "1 minute"],
  ["Hingurakgoda", "07:24 pm", "07:25 pm", "1 minute"],
  ["Polonnaruwa", "07:47 pm", "07:50 pm", "3 minutes"],
  ["Manampitiya", "08:03 pm", "08:04 pm", "1 minute"],
  ["Welikanda", "08:26 pm", "08:27 pm", "1 minute"],
  ["Punani", "08:48 pm", "08:49 pm", "1 minute"],
  ["Valachchenei", "09:13 pm", "09:14 pm", "1 minute"],
  ["Eravur", "09:36 pm", "09:37 pm", "1 minute"],
  ["Batticaloa", "09:52 pm", "09:52 pm", "-"],
];
const trainData11 = [
  ["Kankesanthurai", "01:15 pm", "01:15 pm", "-"],
  ["Chunnakam", "01:22 pm", "01:23 pm", "1 minute"],
  ["Kondavil", "01:27 pm", "01:28 pm", "1 minute"],
  ["Jaffna", "01:32 pm", "01:45 pm", "13 minutes"],
  ["Kodikamam", "02:01 pm", "02:02 pm", "1 minute"],
  ["Kilinochchi", "02:37 pm", "02:38 pm", "1 minute"],
  ["Vavuniya", "03:34 pm", "03:36 pm", "2 minutes"],
  ["Medawachchiya", "03:58 pm", "04:03 pm", "5 minutes"],
  ["Anuradhapura", "04:27 pm", "04:32 pm", "5 minutes"],
  ["Kurunegala", "06:23 pm", "06:30 pm", "7 minutes"],
  ["Polgahawela", "06:53 pm", "06:54 pm", "1 minute"],
  ["Maradana", "08:00 pm", "08:02 pm", "2 minutes"],
  ["Colombo Fort", "08:07 pm", "08:07 pm", "-"],
  ["Bambalapitiya", "08:17 pm", "08:18 pm", "1 minute"],
  ["Wellawatta", "08:22 pm", "08:23 pm", "1 minute"],
  ["Dehiwala", "08:27 pm", "08:28 pm", "1 minute"],
  ["Mount Lavinia", "08:31 pm", "08:31 pm", "-"],
];
const trainData12 = [
  ["Colombo Fort", "09:30 pm", "09:30 pm", "-"],
  ["Ragama", "09:51 pm", "09:52 pm", "1 minute"],
  ["Gampaha", "10:04 pm", "10:06 pm", "2 minutes"],
  ["Veyangoda", "10:18 pm", "10:20 pm", "2 minutes"],
  ["Mirigama", "10:32 pm", "10:33 pm", "1 minute"],
  ["Polgahawela", "10:57 pm", "11:00 pm", "3 minutes"],
  ["Potuhera", "11:20 pm", "11:21 pm", "1 minute"],
  ["Kurunegala", "11:35 pm", "11:37 pm", "2 minutes"],
  ["Wellawa", "11:48 pm", "11:49 pm", "1 minute"],
  ["Ganewatte", "12:03 am", "12:04 am", "1 minute"],
  ["Nagollagama", "12:19 am", "12:20 am", "1 minute"],
  ["Maho", "12:31 am", "12:55 am", "24 minutes"],
  ["Konwewa", "01:13 am", "01:21 am", "8 minutes"],
  ["Ranamuggamuwa", "01:30 am", "01:31 am", "1 minute"],
  ["Moragollagama", "01:37 am", "01:38 am", "1 minute"],
  ["Siyalangamuwa", "01:46 am", "01:47 am", "1 minute"],
  ["Negama", "01:55 am", "01:56 am", "1 minute"],
  ["Aukana", "02:03 am", "02:04 am", "1 minute"],
  ["Kalawewa", "02:10 am", "02:12 am", "2 minutes"],
  ["Kekirawa", "02:26 am", "02:27 am", "1 minute"],
  ["Horiwiala", "02:42 am", "02:43 am", "1 minute"],
  ["Palugaswewa", "02:49 am", "02:50 am", "1 minute"],
  ["Habarana", "03:01 am", "03:02 am", "1 minute"],
  ["Galoya Junction", "03:22 am", "03:40 am", "18 minutes"],
  ["Akbopura", "04:10 am", "04:11 am", "1 minute"],
  ["Kantale", "04:18 am", "04:22 am", "4 minutes"],
  ["Mollipatana", "04:39 am", "04:40 am", "1 minute"],
  ["Thampalakamam", "04:49 am", "04:54 am", "5 minutes"],
  ["China Bey", "05:16 am", "05:20 am", "4 minutes"],
  ["Trincomalee", "05:30 am", "05:30 am", "-"],
];



function checkIfSundayAndAddTrain() {
  const dateInput1 = document.getElementById('start-date').value;
  const dateInput2 = document.getElementById('return-date')
  if (dateInput1 || dateInput2) {
      const date1 = new Date(dateInput1);
      const date2 = new Date(dateInput2)
      const dayOfWeek1 = date1.getDay(); 
      const dayOfWeek2 = date2.getDay();

      if (dayOfWeek1 === 4 || dayOfWeek2 === 4) {
          const newTrain = {
              trainNo: "1325 Ella Odyssey",
              yourStation: "",
              departureTime: "",
              yourDestination: "",
              destinationTime: "",
              availableClasses: [`1st Class Air Conditioned Saloon<br>2nd Class Reserved Seats<br>3rd Class Reserved Seats`],
              frequency: "Only Thursdays",
              trainType: "Express",
              trainData: trainData9, // Link to trainData9
          };

          trainObjects.push(newTrain);
          
      } 
  } 
}


  //Train objects
  var trainObjects = [
    {
      trainNo: "3029 Podi Menike Express Train",
      yourStation: "",
      departureTime: "",
      yourDestination: "",
      destinationTime: "",
      availableClasses: [`1st Class Air Conditioned Saloon<br>2nd Class Reserved Seats<br>3rd Class Reserved Seats`],
      frequency: "Daily",
      trainType: "Express",
      trainData: trainData1, // Link to trainData1
    },
    {
      trainNo: "5079 Trinco-Colombo Night Mail",
      yourStation: "",
      departureTime: "",
      yourDestination: "",
      destinationTime: "",
      availableClasses: [`1st Class Air Conditioned Saloon<br>2nd Class Reserved Seats<br>3rd Class Reserved Seats`],
      frequency: "Daily",
      trainType: "Express",
      trainData: trainData2, // Link to trainData2
    },
    {
      trainNo: "6047 Galu Kumari",
      yourStation: "",
      departureTime: "",
      yourDestination: "",
      destinationTime: "",
      availableClasses: [`1st Class Air Conditioned Saloon<br>2nd Class Reserved Seats<br>3rd Class Reserved Seats`],
      frequency: "Daily",
      trainType: "Express",
      trainData: trainData3, // Link to trainData3
    },
    {
      trainNo: "7056 Udarata Menike",
      yourStation: "",
      departureTime: "",
      yourDestination: "",
      destinationTime: "",
      availableClasses: [`1st Class Air Conditioned Saloon<br>2nd Class Reserved Seats<br>3rd Class Reserved Seats`],
      frequency: "Daily",
      trainType: "Express",
      trainData: trainData4, // Link to trainData4
    },
    {
      trainNo: "1237 Yal Devi Express Train",
      yourStation: "",
      departureTime: "",
      yourDestination: "",
      destinationTime: "",
      availableClasses: [`1st Class Air Conditioned Saloon<br>2nd Class Reserved Seats<br>3rd Class Reserved Seats`],
      frequency: "Daily",
      trainType: "Express",
      trainData: trainData5, // Link to trainData5
    },
    {
      trainNo: "1476 Colombo Fort-KKS Night Mail",
      yourStation: "",
      departureTime: "",
      yourDestination: "",
      destinationTime: "",
      availableClasses: [`1st Class Air Conditioned Saloon<br>2nd Class Reserved Seats<br>3rd Class Reserved Seats`],
      frequency: "Daily",
      trainType: "Express",
      trainData: trainData6, // Link to trainData6
    },
    {
      trainNo: "4738 Udaya Devi",
      yourStation: "",
      departureTime: "",
      yourDestination: "",
      destinationTime: "",
      availableClasses: [`1st Class Air Conditioned Saloon<br>2nd Class Reserved Seats<br>3rd Class Reserved Seats`],
      frequency: "Daily",
      trainType: "Express",
      trainData: trainData7, // Link to trainData7
    },
    {
      trainNo: "8216 Ruhunu Kumari",
      yourStation: "",
      departureTime: "",
      yourDestination: "",
      destinationTime: "",
      availableClasses: [`1st Class Air Conditioned Saloon<br>2nd Class Reserved Seats<br>3rd Class Reserved Seats`],
      frequency: "Daily",
      trainType: "Express",
      trainData: trainData8, // Link to trainData8
    },
    {
      trainNo: "7926 Pulathisi Intercity Express",
      yourStation: "",
      departureTime: "",
      yourDestination: "",
      destinationTime: "",
      availableClasses: [`1st Class Air Conditioned Saloon<br>2nd Class Reserved Seats<br>3rd Class Reserved Seats`],
      frequency: "Daily",
      trainType: "Express",
      trainData: trainData10, // Link to trainData10
    },
    {
      trainNo: "6029 KKS-Colombo Fort Intercity Express",
      yourStation: "",
      departureTime: "",
      yourDestination: "",
      destinationTime: "",
      availableClasses: [`1st Class Air Conditioned Saloon<br>2nd Class Reserved Seats<br>3rd Class Reserved Seats`],
      frequency: "Daily",
      trainType: "Express",
      trainData: trainData11, // Link to trainData11
    },
    {
      trainNo: "8072 Colombo Fort-Trinco Night Express ",
      yourStation: "",
      departureTime: "",
      yourDestination: "",
      destinationTime: "",
      availableClasses: [`1st Class Air Conditioned Saloon<br>2nd Class Reserved Seats<br>3rd Class Reserved Seats`],
      frequency: "Daily",
      trainType: "Express",
      trainData: trainData12, // Link to trainData12
    }
    
    
  ];

  
  function updateTrainObjects() {
    trainObjects.forEach(function (trainObject) {
      trainObject.yourStation = $("#start-station").val();
      trainObject.yourDestination = $("#end-station").val();
      // Find departure and destination times from trainData arrays
      for (let i = 0; i < trainObject.trainData.length; i++) {
        if (trainObject.trainData[i][0] === trainObject.yourStation) {
          trainObject.departureTime = trainObject.trainData[i][2];
        }
        if (trainObject.trainData[i][0] === trainObject.yourDestination) {
          trainObject.destinationTime = trainObject.trainData[i][1];
        }
      }
      
    });
  }

  
  function displayFilteredRows() {
    $("#main-table").removeClass("hide-heading");
    $("#main-table tbody").empty(); 


    trainObjects.forEach(function (trainObject) {
      var fromIndex = trainObject.trainData.findIndex(
        (row) => row[0] === trainObject.yourStation
      );
      var toIndex = trainObject.trainData.findIndex(
        (row) => row[0] === trainObject.yourDestination
      );
      if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
        
        $("#main-table tbody").append(`<tr class="table-row cursor-pointer bg-white border-4 border-gray-200 text-center">
          
          <td class="text-center ml-2 font-semibold">
            ${trainObject.trainNo}
            <br>
            <button class="view-schedule-btn bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
              View schedule
            </button>
          </td>
          <td class="px-3 py-2">
          ${trainObject.yourStation}
          </td>
          <td class="px-3 min-w-32 py-2">
            ${trainObject.departureTime}
          </td>
          <td class="px-3 py-2">
            ${trainObject.yourDestination}
          </td>
          <td class="px-3 py-2">
            ${trainObject.destinationTime}
          </td>
          <td class="px-3 py-2">
            ${trainObject.frequency}
          </td>
          <td class="px-3 py-2">
            ${trainObject.trainType}
          </td>
          <td class="px-3 py-2">
            ${trainObject.availableClasses.join(", ")}
          </td>
          <td class="px-3 py-2">
            Rs. ${trainObjects.price1}<br>Rs. ${
          trainObjects.price2
        }<br>Rs. ${trainObjects.price3}
          </td>

          
        </tr>`);
        
                        main_rowsAdded = true; // Set flag to true if a row is added
                        $("#error-msg").addClass('hidden');
                        $("#proceed-msg").removeClass('hidden');
                        $("#return-error-msg").addClass('hidden');
                        $("final-proceed-btn").removeClass('hidden');
      }
      
    });

    
    if (!main_rowsAdded) {
      $("#tab-container").addClass('hidden');
        $("#error-msg").removeClass('hidden');
        $("#proceed-msg").addClass('hidden');
        $("#return-error-msg").addClass('hidden');
        $("#inside-err").removeClass('hidden')
  }

    

    
    document.querySelectorAll('.view-schedule-btn').forEach(button => {
      button.addEventListener('click', function(event) {
          event.stopPropagation();
          overlayContainer.classList.remove('hidden');
      });
  });

  
  const overlayContainer = document.getElementById('overlay-container');
  const closeOverlayButton = document.getElementById('close-overlay');

  
  document.querySelectorAll('.view-schedule-btn').forEach(button => {
      button.addEventListener('click', function(event) {
          event.stopPropagation();
          overlayContainer.classList.remove('hidden');
          
      var trainNo = $(this)
      .closest("tr")
      .find("td:first-child")
      .contents()
      .filter(function () {
        return this.nodeType === 3;
      })
      .text()
      .trim();
    var trainObject = trainObjects.find((train) => train.trainNo === trainNo);

    
    displayScheduleTable(trainObject.trainData);
      });
  });

  
  closeOverlayButton.addEventListener('click', () => {
      overlayContainer.classList.add('hidden');
  });

  document.addEventListener('scroll', (event) => {
    if (!overlayContainer.classList.contains('hidden')) {
        overlayContainer.scrollTop += event.deltaY;
    }
});

    
  }

  
  function updateReturnTrainObjects() {
    trainObjects.forEach(function (trainObject) {
      trainObject.yourStation = $("#end-station").val();
      trainObject.yourDestination = $("#start-station").val();
      
      for (let i = 0; i < trainObject.trainData.length; i++) {
        if (trainObject.trainData[i][0] === trainObject.yourStation) {
          trainObject.departureTime = trainObject.trainData[i][2];
        }
        if (trainObject.trainData[i][0] === trainObject.yourDestination) {
          trainObject.destinationTime = trainObject.trainData[i][1];
        }
      }
    });
  }

  
  function displayReturnFilteredRows() {
    $("#return-table").removeClass("hide-heading");
    $("#return-table tbody").empty(); 
    

    trainObjects.forEach(function (trainObject) {
        
        var fromIndex = trainObject.trainData.findIndex(
            (row) => row[0] === trainObject.yourStation
        );
        var toIndex = trainObject.trainData.findIndex(
            (row) => row[0] === trainObject.yourDestination
        );
        if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
            
            $("#return-table tbody").append(`<tr class="table-row cursor-pointer bg-white border-4 border-gray-200 text-center">
          
              <td class="text-center ml-2 font-semibold">
                ${trainObject.trainNo}
                <br>
                <button class="view-return-schedule-btn bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                  View schedule
                </button>
              </td>
              <td class="px-3 py-2">
              ${trainObject.yourStation}
              </td>
              <td class="px-3 min-w-32 py-2">
                ${trainObject.departureTime}
              </td>
              <td class="px-3 py-2">
                ${trainObject.yourDestination}
              </td>
              <td class="px-3 py-2">
                ${trainObject.destinationTime}
              </td>
              <td class="px-3 py-2">
                ${trainObject.frequency}
              </td>
              <td class="px-3 py-2">
                ${trainObject.trainType}
              </td>
              <td class="px-3 py-2">
                ${trainObject.availableClasses.join(", ")}
              </td>
              <td class="px-3 py-2">
                Rs. ${trainObjects.price1}<br>Rs. ${
              trainObjects.price2
            }<br>Rs. ${trainObjects.price3}
              </td>
    
              
            </tr>`);
            ret_rowsAdded = true; 
            
            
        }
    });

    
    if (!ret_rowsAdded) {
        $("#return-table").addClass("hide-heading");
    }

    
    
      document.querySelectorAll('.view-return-schedule-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            overlayContainer.classList.remove('hidden');
        });
    });
  
    
    const overlayContainer = document.getElementById('overlay-container');
    const closeOverlayButton = document.getElementById('close-overlay');
  
    
    document.querySelectorAll('.view-return-schedule-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            overlayContainer.classList.remove('hidden');
            
        var trainNo = $(this)
        .closest("tr")
        .find("td:first-child")
        .contents()
        .filter(function () {
          return this.nodeType === 3;
        })
        .text()
        .trim();
      var trainObject = trainObjects.find((train) => train.trainNo === trainNo);
  
      
      displayScheduleTable(trainObject.trainData);
        });
    });
  
    
    closeOverlayButton.addEventListener('click', () => {
        overlayContainer.classList.add('hidden');
    });
  
    document.addEventListener('scroll', (event) => {
      if (!overlayContainer.classList.contains('hidden')) {
          overlayContainer.scrollTop += event.deltaY;
      }
      });
}


  function displayScheduleTable(trainData) {
    $("#schedule-container").empty(); 
    var scheduleTable = `<table class="min-w-1/3 bg-white border border-gray-300 mt-4 mx-auto">
                    <thead>
                        <tr>
                            <th class="lg:py-2 lg:px-4 px-2 border-b">Station name</th>
                            <th class="lg:py-2 lg:px-4 px-4 min-w-24 border-b">Arrival time</th>
                            <th class="lg:py-2 lg:px-4 px-2 border-b">Departure time</th>
                            <th class="lg:py-2 lg:px-4 px-2 border-b">Duration</th>
                        </tr>
                    </thead>
                    <tbody>`;
    trainData.forEach(function (row) {
      scheduleTable += `<tr>
                        <td class="lg:py-2 lg:px-4 px-2 border-b text-center">${row[0]}</td>
                        <td class="lg:py-2 lg:px-4 px-2 border-b text-center">${row[1]}</td>
                        <td class="lg:py-2 lg:px-4 px-2 border-b text-center">${row[2]}</td>
                        <td class="lg:py-2 lg:px-4 px-2 border-b text-center">${row[3]}</td>
                    </tr>`;
    });
    scheduleTable += `</tbody></table>`;
    $("#schedule-container").append(scheduleTable);
  }

  

  modify_button.addEventListener('click', () => {
  formcont.classList.remove('hidden');
  modifybtncont.classList.add('hidden');
  
  
  });

  
  
  $("#train-search-form").submit(function (event) {
    event.preventDefault();
    checkIfSundayAndAddTrain();
    formcont.classList.add('hidden');
      traininfocont.classList.remove('hidden');
      modifybtncont.classList.remove('hidden');
      progressbar.classList.remove('hidden');
      
    
    var start__Station = $('#start-station').val();
    var end__Station = $('#end-station').val();
    var dep__Date = $('#start-date').val();
    var ret__Date = $('#return-date').val();
                
    $('#info-date').text(dep__Date);
                
    $('#info-strat').text(start__Station);
    $('#info-end').text(end__Station);
    
    

    tabContainer.classList.remove("hidden");

    if (!displayBothCheckbox.checked) {
      tab2Button.classList.add("hidden");
      tab1Button.classList.add("flex-1");
      setActiveTab(tab1Button);
    } else {
      tab2Button.classList.remove("hidden");
      tab1Button.classList.remove("flex-1");
      setActiveTab(tab1Button);
      
    }

    

    tab1Button.addEventListener("click", () => {
      mainTable.classList.remove("hidden");
      returnTable.classList.add("hidden");
      setActiveTab(tab1Button);
      $('#info-strat').text(start__Station);
      $('#info-end').text(end__Station);
      $('#info-pic').attr('src', '../assets/reservation/going.jpeg');
      $('#info-date').text(dep__Date);
      
      
    });

    tab2Button.addEventListener("click", () => {
      returnTable.classList.remove("hidden");
      mainTable.classList.add("hidden");
      setActiveTab(tab2Button);
      $('#info-strat').text(end__Station);
      $('#info-end').text(start__Station);
      $('#info-pic').attr('src', '../assets/reservation/coming.jpeg');
      $('#info-date').text(ret__Date);
    });

    function setActiveTab(activeButton) {
      document.querySelectorAll(".tab-button").forEach((button) => {
        button.classList.remove("font-bold", "bg-gray-200", "border-t-2", "border-blue-600", "rounded-t-lg", "text-blue-600", "active");
        button.classList.add("text-black"); 
      });
      activeButton.classList.add("font-bold", "bg-gray-200", "border-t-2", "border-blue-600", "rounded-t-lg", "text-blue-600", "active");
      activeButton.classList.remove("text-black"); 
    }

    
    mainTable.classList.remove("hidden");
    returnTable.classList.add("hidden");
    setActiveTab(tab1Button);

    

    var startStation = $("#start-station").val();
    var endStation = $("#end-station").val();

    trainObjects.forEach(function (train) {
      
      var startIndex = -1;
      var endIndex = -1;

      for (var j = 0; j < train.trainData.length; j++) {
        if (train.trainData[j][0] === startStation) {
          startIndex = j;
        }
        if (train.trainData[j][0] === endStation) {
          endIndex = j;
        }
      }

      if (startIndex !== -1 && endIndex !== -1) {
        var difference = Math.abs(startIndex - endIndex);
        var price1,
          price2,
          price3 = 0;

        if (difference >= 1 && difference <= 5) {
          price1 = 350;
          price2 = 250;
          price3 = 150;
        } else if (difference >= 6 && difference <= 10) {
          price1 = 700;
          price2 = 500;
          price3 = 300;
        } else if (difference >= 11 && difference <= 15) {
          price1 = 1050;
          price2 = 750;
          price3 = 450;
        } else if (difference >= 16 && difference <= 20) {
          price1 = 1400;
          price2 = 1000;
          price3 = 600;
        } else if (difference >= 21 && difference <= 25) {
          price1 = 1750;
          price2 = 1250;
          price3 = 750;
        } else if (difference >= 26 && difference <= 30) {
          price1 = 2100;
          price2 = 1500;
          price3 = 900;
        } else if (difference >= 31 && difference <= 35) {
          price1 = 2450;
          price2 = 1750;
          price3 = 1050;
        } else if (difference >= 36 && difference <= 40) {
          price1 = 2800;
          price2 = 2000;
          price3 = 1200;
        } else if (difference >= 41 && difference <= 45) {
          price1 = 3150;
          price2 = 2250;
          price3 = 1350;
        } else if (difference >= 46 && difference <= 50) {
          price1 = 3500;
          price2 = 2500;
          price3 = 1500;
        }

        
        trainObjects.price1 = price1;
        trainObjects.price2 = price2;
        trainObjects.price3 = price3;
      }
    });

    updateTrainObjects();
    displayFilteredRows();
    updateReturnTrainObjects();
    displayReturnFilteredRows();
    localStorage.setItem("retn-rows-added",ret_rowsAdded);
    


    if (main_rowsAdded == true || ret_rowsAdded == true ) {
      finalbtn.classList.remove('hidden');
      
    }
    
  });
});


