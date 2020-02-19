var patient_list = [{
        p_name: "Chan Ah Tow",
        nric: "900816172368",
        acc_no: "AB8237861a",
        date_admission: "19/10/2020",
        date_discharge: "30/10/2020",
        case_type: "Day Surgery",
        admitting_speciality: "08 General Surgery",
        principal_doctor: "Dr. Beh Suan Tiong",
    }, {
        p_name: "Sutanto Budi Hartono",
        nric: "780816123368",
        acc_no: "AB8232456a",
        date_admission: "9/10/2020",
        date_discharge: "20/10/2020",
        case_type: "Day Surgery",
        admitting_speciality: "18 Obstetrics",
        principal_doctor: "Dr. Chong Keen Wai",
    }, {
        p_name: "Micheal Philip",
        nric: "900818372379",
        acc_no: "AB2379123697a",
        date_admission: "10/10/2020",
        date_discharge: "20/10/2020",
        case_type: "Day Surgery",
        admitting_speciality: "32 Urology",
        principal_doctor: "Dr. Jarrod Lee Piao",
    }

];
var doctor_list = [{
        type: "Principal Surgeon",
        name: "Dr Richard Chew Kim Huat",
        mcr: "01877E",
        date_procedure: "17/7/2019",
        start_ot: "09:26",
        end_ot: "10:33",
        surgical_procedure: "SA704B : Breasts, Lumps, imaging Guided Vaccum assisted Biopsy / Mammodome, Single lesion"

    }, {
        type: "Anaesthetist",
        name: "Dr Chong Kwan Yin",
        mcr: "03792C",
        date_procedure: "17/7/2019",
        start_ot: "10:26",
        end_ot: "10:43",
        surgical_procedure: "SA704B : Breasts, Lumps, imaging Guided Vaccum assisted Biopsy / Mammodome, Single lesion"

    }

];


$(document).ready(function() {
    var id = window.location.href.split('?').pop();
    if (id > 3 || id < 0) {
        window.location.href = "lc.html?1";
    }

    let this_patient = patient_list[id - 1];
    for (var v in this_patient) {
        $("label." + v).text(this_patient[v]);
    }

});


var data_id;
$('.sub_form').click((e) => {
    data_id = e.currentTarget.dataset.id;
    console.log(data_id);
    let this_doctor = doctor_list[data_id - 1];
    if (data_id == '') {
        data_id = 1;
    }
    for (var v in this_doctor) {
        $("label." + v).text(this_doctor[v]);
    }
});

$(".save_other_fees").click(() => {
    let other_fees = [];
    let total_other_fees = 0.00;

    for (let i = 1; i <= 6; i++) {
        other_fees.push($("input[name='other_fees" + i + "']").val());
        $("input[name='other_fees" + i + "']").value = "";
    }
    for (k in other_fees) {
        total_other_fees = parseFloat(total_other_fees) + parseFloat(other_fees[k]);

    }
    $('#sub_form_modal').modal('hide');
    $("span#other_fee" + data_id).text("$" + total_other_fees.toFixed(2)).attr("value", total_other_fees.toFixed(2));
    cal_fees(data_id);
    cal_gst_fees(data_id);
});

var default_fee = "$0.00";
$("input[name='professional_fee1']").keyup(() => {
    cal_fees(1);
    cal_gst_fees(1);
});
$("input[name='implant_fee1']").keyup(() => {
    cal_fees(1);
    cal_gst_fees(1);
});

$("input[name='professional_fee2']").keyup(() => {
    cal_fees(2);
    cal_gst_fees(2);
});
$("input[name='implant_fee2']").keyup(() => {
    cal_fees(2);
    cal_gst_fees(2);
});

function cal_gst_fees(data_id = 0) {
    $("select[name='gst" + data_id + "']").val("");
    $("#charged_gst_fee" + data_id).text(default_fee).attr("value", "0.00");
}

function cal_fees(data_id = 0) {
    let p_f = $("input[name='professional_fee" + data_id + "']").val();
    let i_f = $("input[name='implant_fee" + data_id + "']").val();
    let o_f = $("#other_fee" + data_id).attr('value');
    let total_fee = 0.00;
    total_fee = parseFloat(total_fee) + parseFloat(p_f) + parseFloat(i_f) + parseFloat(o_f);
    $("#total_fee" + data_id).text("$" + total_fee.toFixed(2)).attr("value", total_fee.toFixed(2));
}

$("select[name='gst1']").change(function() {
    var selectedSP = $(this).children("option:selected").val();
    var charged_gst_fee = 0.00;
    switch (selectedSP) {

        case "charged":
            var gst_rate = 0.07;
            let total_fee = $("#total_fee1").attr('value');
            charged_gst_fee = parseFloat(total_fee) * parseFloat(gst_rate);
            break;
        case "waived":
            charged_gst_fee = 0.00;
            break;
        case "not_registered":
            charged_gst_fee = 0.00;
            break;
    }
    $("#charged_gst_fee1").text("$" + charged_gst_fee.toFixed(2)).attr("value", charged_gst_fee.toFixed(2));
});

$("select[name='gst2']").change(function() {
    var selectedSP = $(this).children("option:selected").val();
    var charged_gst_fee = 0.00;
    switch (selectedSP) {

        case "charged":
            var gst_rate = 0.07;
            let total_fee = $("#total_fee2").attr('value');
            charged_gst_fee = parseFloat(total_fee) * parseFloat(gst_rate);
            break;
        case "waived":
            charged_gst_fee = 0.00;
            break;
        case "not_registered":
            charged_gst_fee = 0.00;
            break;
    }
    $("#charged_gst_fee2").text("$" + charged_gst_fee.toFixed(2)).attr("value", charged_gst_fee.toFixed(2));
});


$('button.save_surgical_info').click(() => {
    cal_total();
    alert("Total Surgical Charges saved");
})

$(".save_other_fees2").click(() => {
    let other_fees = [];
    let total_other_fees = 0.00;

    for (let i = 1; i <= 6; i++) {
        other_fees.push($("input[name='other2_fees" + i + "']").val());
        $("input[name='other2_fees" + i + "']").value = "";
    }
    for (k in other_fees) {
        total_other_fees = parseFloat(total_other_fees) + parseFloat(other_fees[k]);

    }
    $('#sub_form_modal2').modal('hide');
    $("span#non_surgical_other_fee" + data_id).text("$" + total_other_fees.toFixed(2)).attr("value", total_other_fees.toFixed(2));
    cal_non_fees(data_id);
    cal_non_gst_fees(data_id);
});
$("input[name='inpatient_fee1']").keyup(() => {
    console.log("fired");
    cal_non_fees(1);
    cal_non_gst_fees(1);
});
$("input[name='inpatient_fee2']").keyup(() => {
    cal_non_fees(2);
    cal_non_gst_fees(2);
});

function cal_non_gst_fees(data_id = 0) {
    $("select[name='non_surgical_gst" + data_id + "']").val("");
    $("#non_surgical_charged_gst_fee" + data_id).text(default_fee).attr("value", "0.00");
}

function cal_non_fees(data_id = 0) {
    let i_f = $("input[name='inpatient_fee" + data_id + "']").val();
    let o_f = $("#non_surgical_other_fee" + data_id).attr('value');
    let total_fee = 0.00;
    total_fee = parseFloat(total_fee) + parseFloat(i_f) + parseFloat(o_f);
    $("#non_surgical_total_fee" + data_id).text("$" + total_fee.toFixed(2)).attr("value", total_fee.toFixed(2));
}

$("select[name='non_surgical_gst1']").change(function() {
    let selectedSP = $(this).children("option:selected").val();
    let non_surgical_charged_gst_fee = 0.00;
    switch (selectedSP) {

        case "charged":
            let gst_rate = 0.07;
            let total_fee = $("#non_surgical_total_fee1").attr('value');
            non_surgical_charged_gst_fee = parseFloat(total_fee) * parseFloat(gst_rate);
            break;
        case "waived":
            non_surgical_charged_gst_fee = 0.00;
            break;
        case "not_registered":
            non_surgical_charged_gst_fee = 0.00;
            break;
    }
    $("#non_surgical_charged_gst_fee1").text("$" + non_surgical_charged_gst_fee.toFixed(2)).attr("value", non_surgical_charged_gst_fee.toFixed(2));
});

$("select[name='non_surgical_gst2']").change(function() {
    let selectedSP = $(this).children("option:selected").val();
    let non_surgical_charged_gst_fee = 0.00;
    switch (selectedSP) {

        case "charged":
            let gst_rate = 0.07;
            let total_fee = $("#non_surgical_total_fee2").attr('value');
            non_surgical_charged_gst_fee = parseFloat(total_fee) * parseFloat(gst_rate);
            break;
        case "waived":
            non_surgical_charged_gst_fee = 0.00;
            break;
        case "not_registered":
            non_surgical_charged_gst_fee = 0.00;
            break;
    }
    $("#non_surgical_charged_gst_fee2").text("$" + non_surgical_charged_gst_fee.toFixed(2)).attr("value", non_surgical_charged_gst_fee.toFixed(2));
});
$('.non_surgical_sub_form').click((e) => {
    data_id = e.currentTarget.dataset.id;
    let this_doctor = doctor_list[data_id - 1];
    for (var v in this_doctor) {
        $("label." + v).text(this_doctor[v]);
    }
});

$('button.save_non_surgical_info').click(() => {
    cal_total();
    alert("Total Non-Surgical Charges saved");
})


function cal_total() {

    // surgical charges
    let total_fee1 = $('#total_fee1').attr('value');
    let total_fee2 = $('#total_fee2').attr('value');
    let charged_gst_fee1 = $('#charged_gst_fee1').attr('value');
    let charged_gst_fee2 = $('#charged_gst_fee2').attr('value');

    let Total_Surgical_Charges1 = parseFloat(total_fee1) + parseFloat(charged_gst_fee1);
    let Total_Surgical_Charges2 = parseFloat(total_fee2) + parseFloat(charged_gst_fee2);
    $(".Total_Surgical_Charges1").text("$" + Total_Surgical_Charges1.toFixed(2)).attr("value", Total_Surgical_Charges1.toFixed(2));
    $(".Total_Surgical_Charges2").text("$" + Total_Surgical_Charges2.toFixed(2)).attr("value", Total_Surgical_Charges2.toFixed(2));

    //non_surgical charges
    let non_surgical_total_fee1 = $('#non_surgical_total_fee1').attr('value');
    let non_surgical_total_fee2 = $('#non_surgical_total_fee2').attr('value');
    let non_surgical_charged_gst_fee1 = $('#non_surgical_charged_gst_fee1').attr('value');
    let non_surgical_charged_gst_fee2 = $('#non_surgical_charged_gst_fee2').attr('value');

    let Total_Non_Surgical_Charges1 = parseFloat(non_surgical_total_fee1) + parseFloat(non_surgical_charged_gst_fee1);
    let Total_Non_Surgical_Charges2 = parseFloat(non_surgical_total_fee2) + parseFloat(non_surgical_charged_gst_fee2);
    $(".Total_Non_Surgical_Charges1").text("$" + Total_Non_Surgical_Charges1.toFixed(2)).attr("value", Total_Non_Surgical_Charges1.toFixed(2));
    $(".Total_Non_Surgical_Charges2").text("$" + Total_Non_Surgical_Charges2.toFixed(2)).attr("value", Total_Non_Surgical_Charges2.toFixed(2));

    //Total charges
    let Total_Charges1 = parseFloat(Total_Surgical_Charges1) + parseFloat(Total_Non_Surgical_Charges1);
    let Total_Charges2 = parseFloat(Total_Surgical_Charges2) + parseFloat(Total_Non_Surgical_Charges2);
    $(".Total_Charges1").text("$" + Total_Charges1.toFixed(2)).attr("value", Total_Charges1.toFixed(2));
    $(".Total_Charges2").text("$" + Total_Charges2.toFixed(2)).attr("value", Total_Charges2.toFixed(2));
}

//default count down timer
$('#countdown #hour').html("1");
$('#countdown #min').html("00");
$('#countdown #sec').html("00");

$(document).ready(function() {
    var hours = 0;
    var min = 59;
    var sec = 59;
    var count_alert = 0;

    setInterval(function time() {

        var d = new Date();
        // var hours = 24 - d.getHours();
        // var min = 60 - d.getMinutes();
        // var sec = 60 - d.getSeconds();

        if ((min + '').length == 1) {
            min = '0' + min;
        }
        if ((sec + '').length == 1) {
            sec = '0' + sec;
        }
        $('#countdown #hour').html(hours);
        $('#countdown #min').html(min);
        $('#countdown #sec').html(sec);

        //count after 0;
        if (min <= 0 && sec <= 1 && count_alert == 0) {

            alert('Times Out！');
            window.location.href = "dashboard.html";
            count_alert++;
            return;
        }
        sec--;

        if (sec == 0) {
            sec = 59;
            min--;
        }


    }, 1000);
});

$('.surgical_procedure_table').hide(1000);
$("select#surgical_procedure").change(function() {
    var selectedSP = $(this).children("option:selected").val();
    if (selectedSP == '') {
        $('.surgical_procedure_table').addClass('none');
    } else {
        $('.sp_title').first().html(" <i class='fas fa-caret-right''></i> Surgical Procedure of " + selectedSP);
        // var clone_item = $(".surgical_procedure_table").first();
        $('.surgical_procedure_table').show(1000);
    }
    if (selectedSP == "SA701S") {

    } else if (selectedSP == "SA704B") {

    } else {

    }

});


var num = 1;
var num_clone = 1;
for (let i = 1; i < 20; i++) {
    $("body").delegate("select#surgical_procedure.clone" + i + "_sp", "change", function() {
        var selectedSP = $(this).children("option:selected").val();
        if (selectedSP == '') {
            $('.clone' + num_clone + '_spt').hide(1000);
        } else {
            $('p.sp_title').last().html(" <i class='fas fa-caret-right''></i> Surgical Procedure of " + selectedSP);
            $('.clone' + num_clone + '_spt').show(1000).removeClass('none');
            num_clone++;
        }

    });

}

//add field section
$("#addField").click(function() {
    var clone_pos = $(".surgical_procedure_table").last();
    var cloned_table = $(".surgical_procedure_table:first-child").clone().addClass('clone' + num + '_spt');
    var cloned_select = $("#surgical_procedure").clone().addClass('clone' + num + '_sp').css({
        "float": "left",
        "width": "49%",
        "margin-right": "2%",
    });
    var cloned_select_no = $("#nature_of_operation").clone().addClass('clone' + num + '_no').css({
        "float": "left",
        "width": "49%",
    });
    clone_pos.after(cloned_table.addClass("none")).after(cloned_select_no).after(cloned_select);
    num++;
});

//remove field section
$("#removeField").click(function() {
    if (num != 1) {
        $("select#surgical_procedure.clone" + (num - 1) + "_sp").remove();
        $("select#nature_of_operation.clone" + (num - 1) + "_no").remove();
        $(".surgical_procedure_table.clone" + (num - 1) + "_spt").remove();
        num--;
        num_clone--;
    } else {
        alert("Surgical Procedure should not less than 1");
    }

});