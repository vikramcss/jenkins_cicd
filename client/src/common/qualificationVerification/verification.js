export let verification = (eq, oq, postId) => {
  if (
    postId == "11" ||
    postId == "12" ||
    postId == "13" ||
    postId == "14" ||
    postId == "15" 
    // postId == "16"
  ) {
    let found = eq.find(
      (q) => q.qualification == "7th"
       
    );
    let found10th = eq.find((q) => q.qualification == "10th");
    if (found || found10th) return { error: 0, success: true, errorMsg: "" };
    
    return {
      error: -1,
      success: false,
      errorMsg: "7th pass is essential qualification",
    };
    //  } else if (postId == "11" || postId=="12" || postId=="13"|| postId=="14" || postId=="15") {
    // let found7th = eq.find((q) => q.qualification == "7th");
    // if (found7th )
    //   return { error: 0, success: true, errorMsg: "" };
    // return {
    //   error: -1,
    //   success: false,
    //   errorMsg:
    //     "7th  is required essential qualification",
    // };
    
  } else if (postId == "21") {
    let found10th = eq.find((q) => q.qualification == "10th");
    let foundLMV = eq.find((q) => q.qualification == "Driving Licence LMV");
    let foundHMV = eq.find((q) => q.qualification == "Driving Licence HMV");


    // let foundCertificateCourse = eq.find(
    //   (q) => q.qualification == "Certificate Course in Horticulture"
    // );
    // let foundDiplomaCourse = eq.find(
    //   (q) => q.qualification == "Diploma in Horticulture"
    // );

    if (found10th && foundLMV && foundHMV )
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg:
        "10th and Driving Licence LMV and HMV is required essential qualification",
    };
  } else if (postId == "22") {
    let found10th = eq.find((q) => q.qualification == "10th");
    // let foundDiploma = eq.find((q) => q.qualification == "Diploma in Pharmacy");
    // let foundBPharm = eq.find((q) => q.qualification == "B-Pharmacy");

    if (found10th )
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg:
        "10th  is required essential qualification",
    };
  } else if (postId == "23") {
    let found10th = eq.find((q) => q.qualification == "10th");
    // let foundCertificate = eq.find(
    //   (q) => q.qualification == "Certificate Course of Medical Dressing"
    // );
    if (found10th)
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg:
        "10th  essential qualification",
    };
  } else if (postId == "24") {
    let found10th = eq.find((q) => q.qualification == "10th");
    let foundITI = eq.find((q) => q.qualification == "ITI in Carpentary");

    if (found10th ) return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg: "10th  essential qualification",
    };
  } else if (postId == "25") {
    let found10th = eq.find((q) => q.qualification == "10th");
    let foundITI = eq.find((q) => q.qualification == "ITI in Wireman Trade");
    if (found10th ) return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg: "10th  is essential qualification",
    };
  } else if (postId == "") {
    let found10th = eq.find((q) => q.qualification == "10th");
    let foundCertificate = eq.find(
      (q) => q.qualification == "Certificate Course of Fire Brigade"
    );
    if (found10th && foundCertificate)
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg:
        "10th and Certificate Course in Fire Brigade is essential qualification",
    };
  } else if (postId == "26") {
    let found10th = eq.find((q) => q.qualification == "10th");
    let foundITI = eq.find((q) => q.qualification == "ITI in Masonry Trade");
    let foundNCVT = eq.find((q) => q.qualification == "NCVT");

    if (found10th && foundITI && foundNCVT) return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg: "10th and ITI in Masonry Trade and NCVT is essential qualification",
    };
  } else if (postId == "") {
    let found12th = eq.find((q) => q.qualification == "10th");
    let foundDiploma = eq.find(
      (q) => q.qualification == "ITI in Masonry Trade"
    );
    if (found12th && foundDiploma)
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg: "10th with ITI in Masonry Trade Required",
    };
  } else if (postId == "31") {
    let found10th = eq.find((q) => q.qualification == "10th");
    let foundFitter = eq.find((q) => q.qualification == "ITI in Fitter Trade");
    let foundNCVT = eq.find((q) => q.qualification == "NCVT");
    if (found10th && foundFitter && foundNCVT)
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg: "10th and ITI in fitter trade and NCVT is required",
    };
  } else if (postId == "27") {
    let found10th = eq.find((q) => q.qualification == "10th");
    let foundITIPumpAttendant = eq.find(
      (q) => q.qualification == "ITI in Pump Mechanic Trade"
    );
    let foundNCVT = eq.find((q)=> q.qualification == "NCVT")
    if (found10th && foundITIPumpAttendant && foundNCVT)
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg:
        "10th and ITI in Pump Attendant Trade and NCVT is essential qualification",
    };
  } else if (postId == "29") {
    let found10th = eq.find((q) => q.qualification == "10th");
    let foundMedicalDressing = eq.find(
      (q) => q.qualification == "Certificate Course of Medical Dressing"
    )
    if (found10th && foundMedicalDressing)
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg:
        "10th and Certificate Course of Medical Dressing is essential qualification",
    };
  } else if (postId == "30") {
    let found10th = eq.find((q) => q.qualification == "10th");
    let foundAutoMechanic = eq.find(
      (q) =>
        q.qualification == "ITI in Motor Mechanic Trade" ||
        q.qualification == "ITI in Diesel Mechanic Trade"
    );
    let foundNCVT = eq.find((q) => q.qualification == "NCVT");
    if (found10th && foundAutoMechanic && foundNCVT)
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg:
        "10th and ITI in Motor Mechanic Trade Or Diesel Mechanic and NCVT  is essential qualification",
    };
  } else if (postId == "28") {
    let found10th = eq.find((q) => q.qualification == "10th");
    let foundGardener = eq.find((q) => q.qualification == "Gardener");
    if (found10th && foundGardener)
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg: "10th and Gardener certificate is required",
    };
  } else if (postId == "32") {
    let found10th = eq.find((q) => q.qualification == "10th");
    let FoundFireFighterCourse = eq.find(
      (q) => q.qualification == "Fire Fighting Course"
    );
    if (found10th && FoundFireFighterCourse)
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg: "10th and Fire Fighting Course certificate is required",
    };
  } else if (postId == "41" ) {
    let found12th = eq.find((q) => q.qualification == "12th");
    let foundDMLT= eq.find((q) => q.qualification == "DMLT");
    if (found12th && foundDMLT) return { error: 0, success: true, errorMsg: "" };

    return {
      error: -1,
      success: false,
      errorMsg: "12th(sci) Pass and Diploma in Medical Laboratory  is essential qualification required",
    };
  } else if (postId == "602") {
    let foundEngineering = eq.find(
      (q) =>
        q.qualification == "Diploma in Mechanical" ||
        q.qualification == "Diploma in Automobile" ||
        q.qualification == "Diploma in Production" ||
        q.qualification == "BE/BTech in Mechanical" ||
        q.qualification == "BE/BTech in Automobile" ||
        q.qualification == "BE/BTech in Production"
    );
    if (foundEngineering) return { error: 0, success: true, errorMsg: "" };

    return {
      error: -1,
      success: false,
      errorMsg:
        "Diploma Or BE/BTech Mechanical Or Automobile Or production Engineering  is essential qualification required",
    };
  } else if (postId == "604") {
    let foundGraduate = eq.find((q) => q.qualification == "Graduation");
    // let foundEnglishOrHindiTypiest = eq.find(
    //   (q) =>
    //     q.qualification == "English Typing 40" ||
    //     q.qualification == "Hindi Typing 30"
    // );
    let foundEnglishOrHindiTypiest = eq.find((q)=>
    q.qualification == "English Typing 40" 
        )
      let foundHindiTypiest = eq.find((q)=> q.qualification == "Hindi Typing 30")
    if (foundGraduate && foundEnglishOrHindiTypiest || foundHindiTypiest) return { error: 0, success: true, errorMsg: "" };

    return {
      error: -1,
      success: false,
      errorMsg:
        "Graduation and English Typing 40 Or Hindi Typing 30 is essential qualification required",
    };
  } else if (postId == "606") {
    let foundMBBS = eq.find((q) => q.qualification == "MBBS");
    let foundCertificate = eq.find((q) => q.qualification == "Certificate With Medical Council Of India/State Medical Council");

    if (foundMBBS && foundCertificate) return { error: 0, success: true, errorMsg: "" };

    return {
      error: -1,
      success: false,
      errorMsg: "MBBS and Certificate With Medical Council Of India/State Medical Council Essential qualification required",
    };
  } else if (postId == "608") {
    let foundBsc = eq.find(
      (q) =>
        q.qualification == "Bsc in Chemistry" ||
        q.qualification == "Bsc in Animal husbandry"
    );
    let foundDiploma = eq.find(
      (q) => q.qualification == "Diploam in sanitory Inspector"
    );

    if (foundBsc && foundDiploma)
      return { error: 0, success: true, errorMsg: "" };

    return {
      error: -1,
      success: false,
      errorMsg:
        "Bsc in Chemistry Or Bsc in Animal husbandry and Diploam in sanitory Inspector  is essential qualification required",
    };
  } else if (postId == "610") {
    let foundCivil = eq.find(
      (q) => q.qualification == "Diploma In Civil" || q.qualification == "BE/BTech In Civil"
    );

    if (foundCivil) return { error: 0, success: true, errorMsg: "" };

    return {
      error: -1,
      success: false,
      errorMsg: "Diploma in Civil Or BE/BTech in Civil is essential qualification required",
    };

     } else if (postId == "611") {
    let foundGraduate = eq.find((q) => q.qualification == "Graduate");
    let foundEnglishandHindi = eq.find(
      (q) =>
        q.qualification == "ENG Typing 40 WPM from Govt Institute"  
    );

     let foundHindi = eq.find(((q)=> q.qualification == "Hindi Typing 30 WPM from Govt Institute"))
    if (foundGraduate && foundEnglishandHindi || foundHindi)
      return { error: 0, success: true, errorMsg: "" };

    return {
      error: -1,
      success: false,
      errorMsg:
        "Graduation and English Typing 40 Or Hindi Typing 30 is essential qualification required",
    };

  } else if (postId == "612") {
    let foundGraduate = eq.find((q) => q.qualification == "Graduation");
    let foundEnglishOrHindiTypiest = eq.find(
      (q) =>
        q.qualification == "English Typing 40 WPM from Govt Institute" 
    );
    let foundHindiTyping = eq.find((q)=>
        q.qualification == "Hindi Typing 30 WPM from Govt Institute")
    if (foundGraduate && foundEnglishOrHindiTypiest || foundHindiTyping)
      return { error: 0, success: true, errorMsg: "" };

    return {
      error: -1,
      success: false,
      errorMsg:
        "Graduation and English Typing 40 Or Hindi Typing 30 from Govt Institute is essential qualification required",
    };

     } else if (postId == "613") {
    let foundGraduate = eq.find((q) => q.qualification == "Graduate");
    let foundHindiTypiest = eq.find(
      (q) =>
        q.qualification == "Hindi Typing 30 WPM from Govt Institute" 
    );
    if (foundGraduate && foundHindiTypiest)
      return { error: 0, success: true, errorMsg: "" };

    return {
      error: -1,
      success: false,
      errorMsg:
        "Graduation and  Hindi Typing 30 is essential qualification required",
    };
  } else if (postId == "614") {
    let foundGraduate = eq.find(
      (q) =>
        q.qualification == "Bsc in Chemistry" ||
        q.qualification == "Bsc in Biology" ||
        q.qualification == "Bsc in Biotechnology"
    );
    let foundDiploma = eq.find(
      (q) => q.qualification == "Diploma in Medical Laboratory Technology"
    );
    if (foundGraduate && foundDiploma)
      return { error: 0, success: true, errorMsg: "" };

    return {
      error: -1,
      success: false,
      errorMsg:
        "Bsc in Chemistry Or Biology Or Biotechnology And Diploma in Medical Laboratory Technology is essential qualification required",
    };
  } else if (postId == "616") {
    let foundDEd = eq.find((q) => q.qualification == "D.Ed");
    let foundTet = eq.find((q) => q.qualification == "TET"|| q.qualification == "CTET");
    if (foundDEd && foundTet) return { error: 0, success: true, errorMsg: "" };

    return {
      error: -1,
      success: false,
      errorMsg: "D.Ed And TET/CTET is essential qualification required",
    };
  } else if (postId == "51" || postId == "52") {
    let found12th = eq.find((q) => q.qualification == "12th");
    if (found12th) return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg: "12th pass is essential qualification required",
    };
  } else if (postId == "601") {
    let foundMCA = eq.find((q) => q.qualification == "MCA");
    let foundBachelorsDegreeInIT = eq.find(
      (q) => q.qualification == "BachelorsDegreeInIT"
    );
    let foundBachelorComputerEng = eq.find(
      (q) => q.qualification == "BachelorComputerEng"
    );
    let foundMCS = eq.find((q) => q.qualification == "MCS");
    let foundBCS = eq.find((q) => q.qualification == "BCS");
    if (
      foundMCA ||
      foundBachelorsDegreeInIT ||
      foundBachelorComputerEng ||
      foundMCS || foundBCS
    )
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg:
        "MCA or BachelorsDegreeInIT Or EngBachelorComputerEng Or MCS Or BCS is essential qualification required",
    };
  } else if (postId == "603") {
    let foundGraduate = eq.find((q) => q.qualification == "Graduate");
    let foundSubOfficerCourse = eq.find(
      (q) => q.qualification == "Sub Officer Course NFSC"
    );
    if (foundGraduate && foundSubOfficerCourse)
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg: "Graduate and subOfficerCourse is required",
    };
  } else if (postId == "605") {
    let foundGraduateHealth = eq.find((q) => q.qualification == "Graduate");
    let foundMultidisciplinary = eq.find(
      (q) => q.qualification == "Course for Multidisciplinary Health Worker"
    );
    if (foundGraduateHealth && foundMultidisciplinary)
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg:
        "Graduate and Multidisciplinary Health Worker certificate  is required",
    };
  } else if (postId == "607") {
    let foundGraduateWithSpecialization = eq.find(
      (q) => q.qualification == "GraduateWithSpecialization"
    );
    let foundTETorCTET = eq.find((q) => q.qualification == "TET" || q.qualification == "CTET");
    if (foundGraduateWithSpecialization && foundTETorCTET)
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg:
        "GraduateWithSpecialization in science, maths, English and  TET/CTET  certificate   is required",
    };
  } else if (postId == "609") {
    let foundDiploma = eq.find(
      (q) => q.qualification == "Diploma in Electrical"
    );
    let foundBEBtech = eq.find((q) => q.qualification == "BE/BTech Electrical");
    if (foundDiploma || foundBEBtech)
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg: "Diploma and BE / Btech is required",
    };
  } else if (postId == "615") {
    let foundBscNursing = eq.find(
      (q) =>
        q.qualification == "BSc.Nursing" || q.qualification == "GNM"
    );
    // let foundGeneralNursing = eq.find((q) => q.qualification == "GeneralNursing");
    let foundMidwiferyCourse = eq.find(
      (q) => q.qualification == "Certificate with Nursing Council of India/State"
    );
    if (foundBscNursing && foundMidwiferyCourse)
      return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg:
        "Bsc Nursing or GNM and Certificate with Nursing Council of India/State  is Required",
    };
  } else if (postId == "53") {
    let foundMBBS = eq.find((q) => q.qualification == "MBBS");
    if (foundMBBS) return { error: 0, success: true, errorMsg: "" };
    return {
      error: -1,
      success: false,
      errorMsg: "MBBS is essential",
    };
  } else {
    return { error: -2, success: false, errorMsg: "postId not found" };
  }
};

// Qualifications: ["MBBS", "PG Degree Pediatrics", "PG Diploma Pediatrics"],
