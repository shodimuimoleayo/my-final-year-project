$(document).ready(function() {
  var images = ["./src/all-images/background-pix/cover-pix.jpg"];
  $.backstretch(images, { duration: 4000, fade: 2000 });
});

function _next_page(next_id) {
  $('.log-div').hide();
  $('#'+next_id).fadeIn(1000);
}


function alert_close(){
  $('.overlay-div').html('').fadeOut(200);
}

function _expand_link(ids){
  $('#'+ids+'-li').toggle('slow');
}

function setActive(clickedItem) {
  const items = document.querySelectorAll('.active');
  items.forEach(item => {
      item.style.backgroundColor = '#fff'; 
  });

  clickedItem.style.backgroundColor = '#d4d4d4';
}

function capitalizeWords(str) {
  return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

function validateTextInput(input) {
	input = input.trim();
	return input === '' || /^[a-zA-Z\s]+$/.test(input);
  }
  
  function validatePhoneNumber(input) {
	input = input.trim();
	return /^[\d\s()+-]+$/.test(input);
  }  


function _get_form(page) {
  $('.overlay-div').html('<div class="ajax-loader"><br><img src="src/all-images/image-pix/ajax-loader.gif"/></div>').fadeIn(500);
  var action='get_form';
  var formData ='action='+ action+'&page='+ page;
  axios.post(admin_portal_local_url, formData)
    .then(response => {
      $('.overlay-div').html(response.data);
    });
}

function _get_form_with_id(page, ids) {
  $('.overlay-div').html('<div class="ajax-loader"><br><img src="src/all-images/image-pix/ajax-loader.gif"/></div>').fadeIn(500);
  var action='_get_form_with_id';
  var formData ='action='+ action+'&page='+ page + '&ids=' + ids;
  axios.post(admin_portal_local_url, formData)
    .then(response => {
      $('.overlay-div').html(response.data);
    });
}

function _get_page(page) {
  $('#main-dashboard').html('<div class="ajax-loader"><br><img src="src/all-images/image-pix/ajax-loader.gif"/></div>').fadeIn(500);
  var action='get_page';
  var formData ='action='+ action+'&page='+ page;
  axios.post(admin_portal_local_url, formData)
    .then(response => {
      $('#main-dashboard').html(response.data);
    });
}


function _get_staff_login(staff_id){

  var formData = 'staff_id=' + staff_id;

  axios.post(endpoint+'/admin/fetch-staff-api?access_key='+access_key, formData, { headers: apikey })
    .then(response => {
      var access_check = response.data.check;
      var success = response.data.success;

      if (access_check==0){
        _logout_();
      }else{

        if (success==true){
        var staff_data = response.data.data;
        var fullname = staff_data.fullname;
        var last_login = staff_data.last_login;
        var firstname = staff_data.firstname;
        var othernames = staff_data.middlename ? staff_data.middlename + ' ' + staff_data.lastname : staff_data.lastname;
        var dob = staff_data.dob;
        var nationality = staff_data.nationality;
        var address = staff_data.address;
        var email_address = staff_data.email_address;
        var mobile_no = staff_data.mobile_no;
        var staff_id = staff_data.staff_id;
        var post_name = staff_data.post_name;
		    var faculty_name = staff_data.faculty_name;
		    var department_name = staff_data.department_name;
        var created_time = staff_data.created_time;
        var last_login = staff_data.last_login;
        var role_name = staff_data.role_name;
        var status_name = staff_data.status_name;
        var role_id = staff_data.role_id;
        var status_id = staff_data.status_id;
        var gender_name = (staff_data.gender_name == null) ? 'Not Assigned' : staff_data.gender_name;
        var gender_id = staff_data.gender_id;

        var staff_profile = capitalizeWords(fullname);
        var dashboard_role = capitalizeWords(role_name);

        var passport = staff_data.passport;
        var documentStoragePath = staff_data.documentStoragePath + '/' + passport;

        $("#login_staff_fullname").html(fullname);
        $("#login_staff_last_login").html(last_login);
        $("#login_staff_profile").html(staff_profile);
        $("#login_status_name").html(status_name);
        $("#login_dashboard_role").html(dashboard_role);

        $("#surname").val(firstname);
        $("#othernames").val(othernames);
        $("#dob").val(dob);
        $("#nationality").val(nationality);
        $("#address").val(address);
        $("#email_address").val(email_address);
        $("#phoneno").val(mobile_no);
        $("#staff_id").val(staff_id);
        $("#post").val(post_name);
        $("#faculty_id").val(faculty_name);
        $("#department_id").val(department_name);
        $("#r_date").val(created_time);
        $("#last_login_date").val(last_login);
        $("#role").val(role_name);
        $("#status").val(status_name);
        $("#role_id").val(role_id);
        $("#status_id").val(status_id);
        $("#gender_id").append('<option value="' + gender_id + '" selected="selected">' + gender_name +"</option>");

        $("#pictureBox2, #pictureBox1").attr('src', documentStoragePath);

        }
      }
    });
}


function _all_staff(status_id) {
    $('#fetch_all_staff').html('<div class="ajax-loader"><br><img src="src/all-images/image-pix/ajax-loader.gif"/></div>').fadeIn(500);
    var search_txt = $('#search').val();
    var formData = 'search_txt=' + search_txt + '&status_id=' + status_id;
  
    axios.post(endpoint+'/admin/fetch-staff-api?access_key='+access_key, formData, { headers: apikey })
    .then(response => {
      var access_check = response.data.check;
      var success = response.data.success;
      var message = response.data.message;
      var fetch = response.data.data;

      if (access_check==0){
        _logout_();
      }else{
        var text = '';

        if (success==true){

            for (var i = 0; i < fetch.length; i++) {
                var staff_id = fetch[i].staff_id;
                var fullname = fetch[i].fullname.toUpperCase();
                var status_name = fetch[i].status_name.toUpperCase();
                var mobile_no = fetch[i].mobile_no;
                var passport = fetch[i].passport;
                var documentStoragePath = fetch[i].documentStoragePath;
      
                text +=
      
                '<div class="w-[45%] h-[130px] bg-[#f0f0f0] rounded-[5px] cursor-pointer hover:shadow-profile-border hover:bg-white mb-[20px]" onClick="_get_form_with_id(' + "'staff-profile-module'" + "," + "'" + staff_id+ "'" + ')">'+
                '<div class="w-[100%] h-[130px] flex items-center gap-[15px]">'+
                    '<div class="w-[100px] h-[100px] shadow-picture-box-border ml-[15px] rounded-[5px]">'+
                        '<div class="w-[80px] h-[80px] bg-black mt-[10px] ml-[10px] rounded-[5px]">'+
                            '<img src="' + documentStoragePath + '/' + passport + '" class="w-[100%] h-[100%] object-cover" style="width: 80px; height: 80px; object-position: top;"/>'+
                        '</div>'+
                    '</div>'+

                    '<div class="flex flex-col gap-1 text-[#424141] font-title">'+
                        '<div class="font-bold">'+ fullname +'</div><hr class="w-[100px] border border-primary-color"/>'+
                        '<div class="text-[10px] pl-[10px] font-body">STAFF ID: '+ staff_id +'</div>'+
                        '<div class="text-[10px] pl-[10px]">'+ mobile_no +'</div>'+
                        '<div class="text-[10px] pl-[10px] text-primary-color">'+ status_name +'</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
      
            }

            $('#fetch_all_staff').html(text);
        }else{
            text +=
          '<div class="false-notification-div">' +
          "<p> " + message + " </p>" + '</div>';
        $('#fetch_all_staff').html(text);
        }
      }
    })
    .catch(error => {
        var errorMessage = '<div class="false-notification-div"><p>' + error + '</p></div>';
        $('#fetch_all_staff').html(errorMessage);
    });
}


function _get_staff_profile(staff_id){

	var formData = 'staff_id=' + staff_id;
  
	axios.post(endpoint+'/admin/fetch-staff-api?access_key='+access_key, formData, { headers: apikey })
	  .then(response => {
		var access_check = response.data.check;
		var success = response.data.success;
  
		if (access_check==0){
		  _logout_();
		}else{
  
		  if (success==true){
			var staff_data = response.data.data;
			var fullname = staff_data.fullname;
			var last_login = staff_data.last_login;
			var firstname = staff_data.firstname;
			var othernames = staff_data.middlename ? staff_data.middlename + ' ' + staff_data.lastname : staff_data.lastname;
			var dob = staff_data.dob;
			var nationality = staff_data.nationality;
			var address = staff_data.address;
			var email_address = staff_data.email_address;
			var mobile_no = staff_data.mobile_no;
			var staff_id = staff_data.staff_id;
			var post_name = staff_data.post_name;
			var faculty_name = staff_data.faculty_name;
			var department_name = staff_data.department_name;
			var created_time = staff_data.created_time;
			var last_login = staff_data.last_login;
			var role_name = staff_data.role_name;
			var role_id = staff_data.role_id;
			var status_name = staff_data.status_name;
			var status_id = staff_data.status_id;
			var faculty_id = staff_data.faculty_id;
			var department_id = staff_data.department_id;
      var registrar_staff_id = staff_data.registrar_staff_id;
      var registrar_fullname = staff_data.registrar_fullname;
      var gender_name = (staff_data.gender_name == null) ? 'Not Assigned' : staff_data.gender_name;
      var gender_id = staff_data.gender_id;
  
			var staff_profile = capitalizeWords(fullname);
  
			var passport = staff_data.passport;
			var documentStoragePath = staff_data.documentStoragePath + '/' + passport;
  
			$("#fullname").html(fullname);
			$("#last_login").html(last_login);
			$("#staff_profile").html(staff_profile);
			$("#status_name").html(status_name);
  
			$("#surname").val(firstname);
			$("#othernames").val(othernames);
			$("#dob").val(dob);
			$("#nationality").val(nationality);
			$("#address").val(address);
			$("#email_address").val(email_address);
			$("#phoneno").val(mobile_no);
			$("#staff_id").val(staff_id);
			$("#post").val(post_name);
			$("#r_date").val(created_time);
			$("#last_login_date").val(last_login);
      $("#r_staff_id").val(registrar_staff_id);
      $("#r_fullname").val(registrar_fullname);

			$("#role_id").append('<option value="' + role_id + '" selected="selected">' + role_name +"</option>");
			$("#status_id").append('<option value="' + status_id + '" selected="selected">' + status_name +"</option>");
			$("#faculty_id").append('<option value="' + faculty_id + '" selected="selected">' + faculty_name +"</option>");
			$("#department_id").append('<option value="' + department_id + '" selected="selected">' + department_name +"</option>");
      $("#gender_id").append('<option value="' + gender_id + '" selected="selected">' + gender_name +"</option>");
  
			$("#staff_passport").attr('src', documentStoragePath);
  
		  }
		}
	});
}


function _get_role(){ 
	axios.post(endpoint+'/admin/fetch-role-api?access_key='+access_key, null, { headers: apikey })
    .then(response => {
		var access_check = response.data.check;
      	var success = response.data.success;
      	var fetch = response.data.data;

		  var text ='';
		  if (access_check==0){
			_logout_();
		  }else{

			if (success==true){
				for (var i=0; i<fetch.length; i++){
					var role_id =fetch[i].role_id;
					var role_name =fetch[i].role_name;
					text+='<option value="'+role_id+'">'+role_name+'</option>';
				}
				$('#role_id').append(text);
			}
		  }
    });
}


function _get_status(){ 
	axios.post(endpoint+'/admin/fetch-status-api?access_key='+access_key, null, { headers: apikey })
    .then(response => {
		var access_check = response.data.check;
      	var success = response.data.success;
      	var fetch = response.data.data;

		  var text ='';
		  if (access_check==0){
			_logout_();
		  }else{

			if (success==true){
				for (var i=0; i<fetch.length; i++){
					var status_id =fetch[i].status_id;
					var status_name =fetch[i].status_name;
					text+='<option value="'+status_id+'">'+status_name+'</option>';
				}
				$('#status_id').append(text);
			}
		  }
    });
}

function _get_post(){ 
	axios.post(endpoint+'/admin/fetch-post-api?access_key='+access_key, null, { headers: apikey })
    .then(response => {
		var access_check = response.data.check;
      	var success = response.data.success;
      	var fetch = response.data.data;

		  var text ='';
		  if (access_check==0){
			_logout_();
		  }else{

			if (success==true){
				for (var i=0; i<fetch.length; i++){
					var post_id =fetch[i].post_id;
					var post_name =fetch[i].post_name;
					text+='<option value="'+post_id+'">'+post_name+'</option>';
				}
				$('#post_id').append(text);
			}
		}
    });
}

function _get_faculty() {
    axios.post(endpoint + '/admin/fetch-faculty-api?access_key=' + access_key, null, { headers: apikey })
    .then(response => {
        var access_check = response.data.check;
        var success = response.data.success;
        var fetch = response.data.data;

        var text = '';
        if (access_check == 0) {
            _logout_(); 
        } else {
            if (success == true) {
                for (var i = 0; i < fetch.length; i++) {
                    var faculty_id = fetch[i].faculty_id;
                    var faculty_name = fetch[i].faculty_name;
                    text += '<option value="' + faculty_id + '">' + faculty_name + '</option>';
                }
                $('#faculty_id').html('<option value="">Select Faculty</option>' + text);
            }
        }
    })
    .catch(error => {
        console.error('Error fetching faculty data:', error);
    });
}

function _get_department(faculty_id) {
    if (!faculty_id) {
        $('#department_id').html('<option value="">Select Department</option>');
        return;
    }
	formData='faculty_id=' + faculty_id

    axios.post(endpoint + '/admin/fetch-department-api?access_key=' + access_key, formData, { headers: apikey })
    .then(response => {
        var access_check = response.data.check;
        var success = response.data.success;
        var fetch = response.data.data;

        var text = '';
        if (access_check == 0) {
            _logout_(); 
        } else {
            if (success == true) {
                for (var i = 0; i < fetch.length; i++) {
                    var department_id = fetch[i].department_id;
                    var department_name = fetch[i].department_name;
                    text += '<option value="' + department_id + '">' + department_name + '</option>';
                }
                $('#department_id').html('<option value="">Select Department</option>' + text);
            }
        }
    });
}

function showError(errorType, message) {
    $('#warning-div').html('<div><i class="bi-exclamation-circle"></i></div>' + errorType + '<br /><span>' + message + '</span>').fadeIn(500).delay(3000).fadeOut(100);
}


function _add_new_staff(){
	var fullname = $('#fullname').val();
	var phoneno = $('#phoneno').val();
	var email = $('#email').val();
	var faculty_id = $('#faculty_id').val();
	var department_id = $('#department_id').val();
	var post_id = $('#post_id').val();
	var role_id = $('#role_id').val();
	var status_id = $('#status_id').val();	

	  if (fullname == '') {
		showError('FULLNAME ERROR!', 'Fill all Fields To Continue');
	  } else if (phoneno == '') {
		showError('PHONE NUMBER ERROR!', 'Fill all Fields To Continue');
	  } else if (email == '') {
		showError('EMAIL ADDRESS ERROR!', 'Fill all Fields To Continue');
	  } else if (faculty_id == 'Select Faculty') {
		showError('FACULTY ERROR!', 'Please select a faculty');
	  } else if (department_id == 'Select Department') {
		showError('DEPARTMENT ERROR!', 'Please select a department');
	  } else if (post_id == 'Select Post') {
		showError('POST ERROR!', 'Please select a post');
	  } else if (role_id === 'Select Role') {
		showError('ROLE ERROR!', 'Please select a role');
	  } else if (status_id === 'Select Status') {
		showError('STATUS ERROR!', 'Please select a status');
	  } else if (!validateTextInput(fullname)) {
		showError('FULLNAME ERROR!', 'Digit is not allowed in fullname input');
	  } else if (!validatePhoneNumber(phoneno)) {
		showError('PHONE ERROR!', 'Please ensure you enter a valid phone number');
  
	}else{
  
	  var btn_text  = $('#submit_btn').html();
	  $('#submit_btn').html('<i id="spinner" class="bi bi-arrow-repeat"></i> PROCESSING...');
	  document.getElementById('submit_btn').disabled = true;
  
	  var formData ='fullname=' + fullname + '&mobile_no=' + phoneno + '&email_address=' + email + '&faculty_id=' + faculty_id + '&department_id=' + department_id + '&post_id=' + post_id + '&role_id=' + role_id + '&status_id=' + status_id;

	  axios.post(endpoint + '/admin/add-new-staff-api?access_key=' + access_key, formData, { headers: apikey })
	  .then(response => {
		  var access_check = response.data.check;
		  var success = response.data.success;
		  var message = response.data.message;

		  if (access_check == 0) {
			  _logout_(); 
		  } else {
			if (success == true) {
				$('#success-div').html('<div><i class="bi-check-all"></i></div>SUCCESS!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
				$('#submit_btn').html(btn_text);
				document.getElementById('submit_btn').disabled=false;
				alert_close();
				_all_staff(1, 2);
			}else{
				$('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
          		$('#submit_btn').html(btn_text);
          		document.getElementById('submit_btn').disabled=false;
			}
		  }
	  })
	  .catch(error => {
		$('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + error).fadeIn(500).delay(5000).fadeOut(100);
		$('#submit_btn').html(btn_text);
		document.getElementById('submit_btn').disabled = false;
	  });
	  
	}
  }

  
function _update_staff_data(staff_id){
  var surname = $('#surname').val();
  var othername = $('#othernames').val();
  var fullname = surname + ' ' + othername;
  var dob = $('#dob').val();
  var nationality = $('#nationality').val();
  var address = $('#address').val();
  var email_address = $('#email_address').val();
  var phoneno = $('#phoneno').val();
  var role = $('#role_id').val();
  var status = $('#status_id').val();
  var gender = $('#gender_id').val();

  if (surname==''){
    showError('SURNAME ERROR!', 'Fill all Fields To Continue');
  }else if (email_address==''){
    showError('EMAIL ADDRESS ERROR!', 'Fill all Fields To Continue');
  }else if (phoneno==''){
    showError('PHONE NUMBER ERROR!', 'Fill all Fields To Continue');
  }else if (!validatePhoneNumber(phoneno)){
    showError('PHONE NUMBER ERROR!', 'Fill all Fields To Continue');
  }else if (!validateTextInput(surname)){
    showError('SURNAME ERROR!', 'Fill all Fields To Continue');
  }else if (!validateTextInput(nationality)){
    showError('NATIONALITY ERROR!', 'Fill all Fields To Continue');
  }

  else{

    var btn_text  = $('#submit_btn').html();
    $('#submit_btn').html('<i id="spinner" class="bi bi-arrow-repeat"></i> UPDATING...');
    document.getElementById('submit_btn').disabled = true;

    var formData ='fullname=' + fullname + '&phoneno=' + phoneno + '&email_address=' + email_address + '&dob=' + dob + '&nationality=' + nationality + '&address=' + address + '&staff_id=' + staff_id + '&role_id=' + role + '&status_id=' + status + '&gender=' + gender;

    axios.post(endpoint + '/admin/update-staff-api?access_key=' + access_key, formData, { headers: apikey })

    .then(response => {
		  var access_check = response.data.check;
		  var success = response.data.success;
		  var message = response.data.message;

		  if (access_check == 0) {
			  _logout_();
		  } else {
			if (success == true) {
				$('#success-div').html('<div><i class="bi-check-all"></i></div>SUCCESS!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
				$('#submit_btn').html(btn_text);
				document.getElementById('submit_btn').disabled=false;
           _all_staff(1, 2);
			}else{
				$('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
            $('#submit_btn').html(btn_text);
            document.getElementById('submit_btn').disabled=false;
			}
		  }
	  })
	  .catch(error => {
		$('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + error).fadeIn(500).delay(5000).fadeOut(100);
		$('#submit_btn').html(btn_text);
		document.getElementById('submit_btn').disabled = false;
	  });
  }
}

function _update_student_data(student_id){
  var surname = $('#surname').val();
  var othername = $('#othernames').val();
  var fullname = surname + ' ' + othername;
  var dob = $('#dob').val();
  var nationality = $('#nationality').val();
  var address = $('#address').val();
  var email_address = $('#email_address').val();
  var mobileno = $('#mobileno').val();
  var department_id = $('#department_id').val();
  var level_id = $('#level_id').val();

  if (surname==''){
    showError('SURNAME ERROR!', 'Fill all Fields To Continue');
  }else if (email_address==''){
    showError('EMAIL ADDRESS ERROR!', 'Fill all Fields To Continue');
  }else if (mobileno==''){
    showError('PHONE NUMBER ERROR!', 'Fill all Fields To Continue');
  }else if (!validatePhoneNumber(mobileno)){
    showError('PHONE NUMBER ERROR!', 'Fill all Fields To Continue');
  }else if (!validateTextInput(surname)){
    showError('SURNAME ERROR!', 'Fill all Fields To Continue');
  }else if (!validateTextInput(nationality)){
    showError('NATIONALITY ERROR!', 'Fill all Fields To Continue');
  }

  else{

    var btn_text  = $('#submit_btn').html();
    $('#submit_btn').html('<i id="spinner" class="bi bi-arrow-repeat"></i> UPDATING...');
    document.getElementById('submit_btn').disabled = true;

    var formData ='fullname=' + fullname + '&mobileno=' + mobileno + '&email_address=' + email_address + '&dob=' + dob + '&nationality=' + nationality + '&address=' + address + '&student_id=' + student_id + '&department_id=' + department_id + '&level_id=' + level_id;

    axios.post(endpoint + '/admin/update-student-api?access_key=' + access_key, formData, { headers: apikey })

    .then(response => {
		  var access_check = response.data.check;
		  var success = response.data.success;
		  var message = response.data.message;

		  if (access_check == 0) {
			  _logout_();
		  } else {
			if (success == true) {
				$('#success-div').html('<div><i class="bi-check-all"></i></div>SUCCESS!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
				$('#submit_btn').html(btn_text);
				document.getElementById('submit_btn').disabled=false;
        _all_student('');
			}else{
				$('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
        $('#submit_btn').html(btn_text);
        document.getElementById('submit_btn').disabled=false;
			}
		  }
	  })
	  .catch(error => {
		$('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + error).fadeIn(500).delay(5000).fadeOut(100);
		$('#submit_btn').html(btn_text);
		document.getElementById('submit_btn').disabled = false;
	  });
  }
}

function _get_gender() {
    axios.post(endpoint + '/admin/fetch-gender-api?access_key=' + access_key, null, { headers: apikey })
    .then(response => {
        var access_check = response.data.check;
        var success = response.data.success;
        var fetch = response.data.data;

        var text = '';
        if (access_check == 0) {
            _logout_(); 
        } else {
            if (success == true) {
                for (var i = 0; i < fetch.length; i++) {
                    var gender_id = fetch[i].gender_id;
                    var gender_name = fetch[i].gender_name;
                    text += '<option value="' + gender_id + '">' + gender_name + '</option>';
                }
                $('#gender_id').html('<option value="">Select Gender</option>' + text);
            }
        }
    });
}


function _all_student(status_id) {
    $('#fetch_all_student').html('<div class="ajax-loader"><br><img src="src/all-images/image-pix/ajax-loader.gif"/></div>').fadeIn(500);
    var search_txt = $('#search').val();
    var formData = 'search_txt=' + search_txt + '&status_id=' + status_id;
  
    axios.post(endpoint+'/admin/fetch-user-api?access_key='+access_key, formData, { headers: apikey })
    .then(response => {
      var access_check = response.data.check;
      var success = response.data.success;
      var message = response.data.message;
      var fetch = response.data.data;

      if (access_check==0){
        _logout_();
      }else{
        var text = '';

        if (success==true){

            for (var i = 0; i < fetch.length; i++) {
                var student_id = fetch[i].student_id;
                var fullname = fetch[i].fullname.toUpperCase();
                var status_name = fetch[i].status_name.toUpperCase();
                var mobile_no = fetch[i].mobileno;
                var passport = fetch[i].passport;
                var documentStoragePath = fetch[i].documentStoragePath;
      
                text +=
      
                '<div class="w-[45%] h-[130px] bg-[#f0f0f0] rounded-[5px] cursor-pointer hover:shadow-profile-border hover:bg-white mb-[20px]" onClick="_get_form_with_id(' + "'student-profile-module'" + "," + "'" + student_id+ "'" + ')">'+
                '<div class="w-[100%] h-[130px] flex items-center gap-[15px]">'+
                    '<div class="w-[100px] h-[100px] shadow-picture-box-border ml-[15px] rounded-[5px]">'+
                        '<div class="w-[80px] h-[80px] bg-black mt-[10px] ml-[10px] rounded-[5px]">'+
                            '<img src="' + documentStoragePath + '/' + passport + '" class="w-[100%] h-[100%] object-cover" style="width: 80px; height: 80px; object-position: top;"/>'+
                        '</div>'+
                    '</div>'+

                    '<div class="flex flex-col gap-1 text-[#424141] font-title">'+
                        '<div class="font-bold">'+ fullname +'</div><hr class="w-[100px] border border-primary-color"/>'+
                        '<div class="text-[10px] pl-[10px] font-body">MATRIC NUMBER: '+ student_id +'</div>'+
                        '<div class="text-[10px] pl-[10px]">'+ mobile_no +'</div>'+
                        '<div class="text-[10px] pl-[10px] text-primary-color">'+ status_name +'</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
      
            }

            $('#fetch_all_student').html(text);
        }else{
            text +=
          '<div class="false-notification-div">' +
          "<p> " + message + " </p>" + '</div>';
        $('#fetch_all_student').html(text);
        }
      }
    })
    .catch(error => {
        var errorMessage = '<div class="false-notification-div"><p>' + error + '</p></div>';
        $('#fetch_all_student').html(errorMessage);
    });
}

function _add_new_course(){
    var course_code = $('#course_code').val();
	var course_title = $('#course_title').val();
	var course_unit = $('#course_unit').val();

    if (course_code==''){
        showError('COURSE CODE ERROR!', 'Fill all Fields To Continue');
    }else if (course_title==''){
        showError('COURSE TITLE ERROR!', 'Fill all Fields To Continue');
    }else if (course_unit==''){
        showError('COURSE UNIT ERROR!', 'Fill all Fields To Continue');
    }else{

        var btn_text  = $('#submit_btn').html();
        $('#submit_btn').html('<i id="spinner" class="bi bi-arrow-repeat"></i> SUBMITTING...');
        document.getElementById('submit_btn').disabled = true;

        var formData = 'course_code=' + course_code + '&course_title=' + course_title + '&course_unit=' + course_unit;

        axios.post(endpoint+'/admin/add-new-course-api?access_key='+access_key, formData, { headers: apikey })
        .then(response => {
            var access_check = response.data.check;
            var success = response.data.success;
            var message = response.data.message;
    
            if (access_check == 0) {
                _logout_(); 
            } else {
                if (success == true) {
                    $('#success-div').html('<div><i class="bi-check-all"></i></div>SUCCESS!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
                    $('#submit_btn').html(btn_text);
                    document.getElementById('submit_btn').disabled=false;
                    alert_close();
                }else{
                    $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
                    $('#submit_btn').html(btn_text);
                    document.getElementById('submit_btn').disabled=false;
                }
            }
        })
        .catch(error => {
            $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + error).fadeIn(500).delay(5000).fadeOut(100);
            $('#submit_btn').html(btn_text);
            document.getElementById('submit_btn').disabled = false;
        });
    }
}

function _add_new_faculty(){
  var faculty_name = $('#faculty_name').val();

  if (faculty_name==''){
      showError('FACULTY NAME ERROR!', 'Fill all Fields To Continue');
  }else{

      var btn_text  = $('#submit_btn').html();
      $('#submit_btn').html('<i id="spinner" class="bi bi-arrow-repeat"></i> SUBMITTING...');
      document.getElementById('submit_btn').disabled = true;

      var formData = 'faculty_name=' + faculty_name;

      axios.post(endpoint+'/admin/add-new-faculty-api?access_key='+access_key, formData, { headers: apikey })
      .then(response => {
          var access_check = response.data.check;
          var success = response.data.success;
          var message = response.data.message;
  
          if (access_check == 0) {
              _logout_(); 
          } else {
              if (success == true) {
                  $('#success-div').html('<div><i class="bi-check-all"></i></div>SUCCESS!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
                  $('#submit_btn').html(btn_text);
                  document.getElementById('submit_btn').disabled=false;
                  alert_close();
              }else{
                  $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
                  $('#submit_btn').html(btn_text);
                  document.getElementById('submit_btn').disabled=false;
              }
          }
      })
      .catch(error => {
          $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + error).fadeIn(500).delay(5000).fadeOut(100);
          $('#submit_btn').html(btn_text);
          document.getElementById('submit_btn').disabled = false;
      });
  }
}

function fetchFaculties(page, faculty_id) {
    $('#fetch_all_faculty').html('<div class="ajax-loader"><br><img src="src/all-images/image-pix/ajax-loader.gif"/></div>').fadeIn(500);
    var search_txt = $('#search').val();

    var formData = 'faculty_id=' + faculty_id + '&search_txt=' + search_txt;

    axios.post(endpoint + '/admin/fetch-all-faculty-api?access_key=' + access_key + '&page=' + page, formData, { headers: apikey })
        .then(response => {
            var access_check = response.data.check;
            var success = response.data.success;
            var message = response.data.message;
            var fetch = response.data.data;
            var pagination = response.data.pagination;

            if (access_check == 0) {
                _logout_();
            } else {
                var text = '';

                if (success == true) {
                    if (fetch.length > 0) {
                        text = '<table class="w-[100%] border-collapse"><thead><tr><th>SN</th><th>FACULTY NAME</th><th>DATE CREATED</th><th>ACTION</th></tr></thead><tbody class="bg-white">';
                        for (var i = 0; i < fetch.length; i++) {
                            var faculty_id = fetch[i].faculty_id;
                            var faculty_name = fetch[i].faculty_name.toUpperCase();
                            var created_time = fetch[i].created_time;

                            text +=
                            '<tr>'+
                                '<td>' + (i + 1) + '</td>'+
                                '<td>' + faculty_name + '</td>'+
                                '<td>' + created_time + '</td>'+
                                '<td><i onclick="_get_form_with_id(' + "'update-faculty'" + "," + "'" + faculty_id + "'" + ')" class="bi bi-pencil-square text-[15px] text-white p-[8px] bg-primary-color cursor-pointer hover:bg-[#444444]" title="VIEW PROFILE"></i></td>'+
                            '</tr>';
                        }
                        text += '</tbody></table>'+

                        '<div class="my-[10px] flex justify-between">'+
                            '<div class="text-[#3a4669]">Showing ' + pagination.current_page + ' to ' + pagination.total_pages + ' of ' + pagination.total_faculty + ' entries</div>'+
                            '<div class="flex gap-1">'+
                                '<button class="text-sm py-[8px] px-[15px]" ' +(pagination.prev_page ? 'onclick="fetchFaculties(' + pagination.prev_page + ', \'\')"' : 'disabled') +'>PREVIOUS</button>' +
                                '<button class="text-sm py-[8px] px-[15px]" ' +(pagination.next_page ? 'onclick="fetchFaculties(' + pagination.next_page + ', \'\')"' : 'disabled') +'>NEXT</button>';
                            '</div>'+
                        '</div>';

                    } 

                    $('#fetch_all_faculty').html(text);
                } else {
                    text = '<table class="w-[100%] border-collapse"><thead><tr><th>SN</th><th>FACULTY NAME</th><th>DATE CREATED</th><th>ACTION</th></tr></thead>' +
                    '<tbody class="bg-white">' + 
                    '</tbody></table>' + 
                    '<div class="bg-[#FAF3F0] text-[#3a4669] border-[#F2BDA2] border-[1px] w-[100%] mx-auto mt-[5px] flex gap-1 p-[10px] pl-[30px] text-[12px]">' +
                    '<i class="bi bi-bell"></i><p>' + message + '</p>' +
                    '</div>';
             
                    $('#fetch_all_faculty').html(text);
             
                }
            }
        })
        .catch(error => {
            console.error('Error fetching faculty:', error);
            $('#fetch_all_faculty').html('<p>There was an error fetching the faculties. Please try again later.</p>');
        });
}


function fetchDepartment(page, department_id) {
    $('#fetch_all_department').html('<div class="ajax-loader"><br><img src="src/all-images/image-pix/ajax-loader.gif"/></div>').fadeIn(500);
    var search_txt = $('#search').val();

    var formData = 'department_id=' + department_id + '&search_txt=' + search_txt;

    axios.post(endpoint + '/admin/fetch-all-department-api?access_key=' + access_key + '&page=' + page, formData, { headers: apikey })
        .then(response => {
            var access_check = response.data.check;
            var success = response.data.success;
            var message = response.data.message;
            var fetch = response.data.data;
            var pagination = response.data.pagination;

            if (access_check == 0) {
                _logout_();
            } else {
                var text = '';

                if (success == true) {
                    if (fetch.length > 0) {
                        text = '<table class="w-[100%] border-collapse"><thead><tr><th>SN</th><th>DEPARTMENT NAME</th><th>FACULTY NAME</th><th>DATE CREATED</th><th>ACTION</th></tr></thead><tbody class="bg-white">';
                        for (var i = 0; i < fetch.length; i++) {
                            var department_id = fetch[i].department_id;
                            var department_name = fetch[i].department_name;
                            var faculty_name = fetch[i].faculty_name.toUpperCase();
                            var created_time = fetch[i].created_time;

                            text +=
                            '<tr>'+
                                '<td>' + (i + 1) + '</td>'+
                                '<td>' + department_name + '</td>'+
                                '<td>' + faculty_name + '</td>'+
                                '<td>' + created_time + '</td>'+
                                '<td><i onclick="_get_form_with_id(' + "'update-department'" + "," + "'" + department_id + "'" + ')" class="bi bi-pencil-square text-[15px] text-white p-[8px] bg-primary-color cursor-pointer hover:bg-[#444444]" title="VIEW PROFILE"></i></td>'+
                            '</tr>';
                        }
                        text += '</tbody></table>'+

                        '<div class="my-[10px] flex justify-between">'+
                            '<div class="text-[#3a4669]">Showing ' + pagination.current_page + ' to ' + pagination.total_pages + ' of ' + pagination.total_department + ' entries</div>'+
                            '<div class="flex gap-1">'+
                                '<button class="text-sm py-[8px] px-[15px]" ' +(pagination.prev_page ? 'onclick="fetchDepartment(' + pagination.prev_page + ', \'\')"' : 'disabled') +'>PREVIOUS</button>' +
                                '<button class="text-sm py-[8px] px-[15px]" ' +(pagination.next_page ? 'onclick="fetchDepartment(' + pagination.next_page + ', \'\')"' : 'disabled') +'>NEXT</button>';
                            '</div>'+
                        '</div>';

                    } 

                    $('#fetch_all_department').html(text);
                } else {
                  text = '<table class="w-[100%] border-collapse"><thead><tr><th>SN</th><th>FACULTY NAME</th><th>DATE CREATED</th><th>ACTION</th></tr></thead>' +
                  '<tbody class="bg-white">' + 
                  '</tbody></table>' + 
                  '<div class="bg-[#FAF3F0] text-[#3a4669] border-[#F2BDA2] border-[1px] w-[100%] mx-auto mt-[5px] flex gap-1 p-[10px] pl-[30px] text-[12px]">' +
                  '<i class="bi bi-bell"></i><p>' + message + '</p>' +
                  '</div>';
                    $('#fetch_all_department').html(text);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching department:', error);
            $('#fetch_all_department').html('<p>There was an error fetching the department. Please try again later.</p>');
        });
}


function _add_new_department(){
  var faculty_id = $('#faculty_id').val();
  var department_name = $('#department_name').val();

  if (faculty_id==''){
      showError('FACULTY ERROR!', 'Fill all Fields To Continue');
  }else if (department_name==''){
    showError('DEPARTMENT NAME ERROR!', 'Fill all Fields To Continue');
  }else{

      var btn_text  = $('#submit_btn').html();
      $('#submit_btn').html('<i id="spinner" class="bi bi-arrow-repeat"></i> SUBMITTING...');
      document.getElementById('submit_btn').disabled = true;

      var formData = 'faculty_id=' + faculty_id + '&department_name=' + department_name;

      axios.post(endpoint+'/admin/add-new-department-api?access_key='+access_key, formData, { headers: apikey })
      .then(response => {
          var access_check = response.data.check;
          var success = response.data.success;
          var message = response.data.message;
  
          if (access_check == 0) {
              _logout_(); 
          } else {
              if (success == true) {
                  $('#success-div').html('<div><i class="bi-check-all"></i></div>SUCCESS!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
                  $('#submit_btn').html(btn_text);
                  document.getElementById('submit_btn').disabled=false;
                  alert_close();
              }else{
                  $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
                  $('#submit_btn').html(btn_text);
                  document.getElementById('submit_btn').disabled=false;
              }
          }
      })
      .catch(error => {
          $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + error).fadeIn(500).delay(5000).fadeOut(100);
          $('#submit_btn').html(btn_text);
          document.getElementById('submit_btn').disabled = false;
      });
  }
}

function _get_course() {
    axios.post(endpoint + '/admin/fetch-course-api?access_key=' + access_key, null, { headers: apikey })
    .then(response => {
        var access_check = response.data.check;
        var success = response.data.success;
        var fetch = response.data.data;

        var text = '';
        if (access_check == 0) {
            _logout_(); 
        } else {
            if (success == true) {
                for (var i = 0; i < fetch.length; i++) {
                    var course_id = fetch[i].course_id;
                    var course_code = fetch[i].course_code;
                    text += '<option value="' + course_id + '">' + course_code + '</option>';
                }
                $('#course_id').html('<option value="">Select Course</option>' + text);
            }
        }
    });
}


function _add_new_department_course(){
    var faculty_id = $('#faculty_id').val();
    var department_id = $('#department_id').val();
	  var course_id = $('#course_id').val();

    if (faculty_id=='Select Faculty'){
        showError('FACULTY ERROR!', 'Fill all Fields To Continue');
    }else if (department_id=='Select Department'){
        showError('DEPARTMENT ERROR!', 'Fill all Fields To Continue');
    }else if (course_id=='Select Course'){
        showError('COURSE ERROR!', 'Fill all Fields To Continue');
    }else{

        var btn_text  = $('#submit_btn').html();
        $('#submit_btn').html('<i id="spinner" class="bi bi-arrow-repeat"></i> SUBMITTING...');
        document.getElementById('submit_btn').disabled = true;

        var formData = 'department_id=' + department_id + '&course_id=' + course_id;

        axios.post(endpoint+'/admin/add-new-department-course-api?access_key='+access_key, formData, { headers: apikey })
        .then(response => {
            var access_check = response.data.check;
            var success = response.data.success;
            var message = response.data.message;
    
            if (access_check == 0) {
                _logout_(); 
            } else {
                if (success == true) {
                    $('#success-div').html('<div><i class="bi-check-all"></i></div>SUCCESS!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
                    $('#submit_btn').html(btn_text);
                    document.getElementById('submit_btn').disabled=false;
                    alert_close();
                }else{
                    $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
                    $('#submit_btn').html(btn_text);
                    document.getElementById('submit_btn').disabled=false;
                }
            }
        })
        .catch(error => {
            $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + error).fadeIn(500).delay(5000).fadeOut(100);
            $('#submit_btn').html(btn_text);
            document.getElementById('submit_btn').disabled = false;
        });
    }
}

function fetchEachFaculty(faculty_id) {
  var formData = 'faculty_id=' + faculty_id;
  axios.post(endpoint + '/admin/fetch-all-faculty-api?access_key=' + access_key, formData, { headers: apikey })
    .then(response => {
      var access_check = response.data.check;
      var success = response.data.success;
      var fetch = response.data.data[0];

      if (access_check == 0) {
        _logout_();
      } else {

        if (success == true) {
          $('#faculty_name').val(fetch.faculty_name);
        }
      }
    })
}

function fetchEachDepartment(department_id) {
  var formData = 'department_id=' + department_id;
  axios.post(endpoint + '/admin/fetch-all-department-api?access_key=' + access_key, formData, { headers: apikey })
    .then(response => {
      var access_check = response.data.check;
      var success = response.data.success;
      var fetch = response.data.data[0];

      if (access_check == 0) {
        _logout_();
      } else {

        if (success == true) {
          var faculty_id = fetch.faculty_id;
          var department_id = fetch.department_id;
          var faculty_name = fetch.faculty_name;
          var department_name = fetch.department_name;
          $("#faculty_id").append('<option value="' + faculty_id + '" selected="selected">' + faculty_name +"</option>");
          $("#department_id").append('<option value="' + department_id + '" selected="selected">' + department_name +"</option>");
        }
      }
    })
}


function _change_pass(staff_id){
    var old_pass = $('#old_pass').val();
    var new_pass = $('#new_pass').val();
	  var confirm_pass = $('#confirm_pass').val();

    if (old_pass==''){
        showError('OLD PASSWORD ERROR!', 'Fill all Fields To Continue');
    }else if (new_pass==''){
        showError('NEW PASSWORD ERROR!', 'Fill all Fields To Continue');
    }else if (confirm_pass==''){
        showError('CONFIRM PASSWORD ERROR!', 'Fill all Fields To Continue');
    }else{

        var btn_text  = $('#submit_btn').html();
        $('#submit_btn').html('<i id="spinner" class="bi bi-arrow-repeat"></i> SUBMITTING...');
        document.getElementById('submit_btn').disabled = true;

        var formData = 'staff_id=' + staff_id + '&old_pass=' + old_pass + '&new_pass=' + new_pass + '&confirm_pass=' + confirm_pass;
        axios.post(endpoint+'/admin/change-pass-api?access_key='+access_key, formData, { headers: apikey })

        .then(response => {
            var access_check = response.data.check;
            var success = response.data.success;
            var message = response.data.message;
    
            if (access_check == 0) {
                _logout_(); 
            } else {
                if (success == true) {
                    $('#success-div').html('<div><i class="bi-check-all"></i></div>SUCCESS!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
                    $('#submit_btn').html(btn_text);
                    document.getElementById('submit_btn').disabled=false;
                    alert_close();
                }else{
                    $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
                    $('#submit_btn').html(btn_text);
                    document.getElementById('submit_btn').disabled=false;
                }
            }
        })
        .catch(error => {
            $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + error).fadeIn(500).delay(5000).fadeOut(100);
            $('#submit_btn').html(btn_text);
            document.getElementById('submit_btn').disabled = false;
        });
    }
}

function all_counts(){
    axios.post(endpoint+'/admin/all-tables-count-api?access_key='+access_key, null, { headers: apikey })
    .then(response => {
        var access_check = response.data.check;
        var success = response.data.success;

        if (access_check == 0) {
            _logout_(); 
        } else {
            if (success == true) {
                var count = response.data.data;
                var staff_count = count.staff_count;
                var student_count = count.student_count;
                var faculty_count = count.faculty_count;
                var department_count = count.department_count;
                var course_count = count.course_count;

                $('#total_staff').html(staff_count);
                $('#total_student').html(student_count);
                $('#total_faculty').html(faculty_count);
                $('#total_department').html(department_count);
                $('#total_course').html(course_count);
            }
        }
    })
}


function _get_student_profile(student_id){

	var formData = 'student_id=' + student_id;
  
	axios.post(endpoint+'/admin/fetch-user-api?access_key='+access_key, formData, { headers: apikey })
	  .then(response => {
		var access_check = response.data.check;
		var success = response.data.success;
  
		if (access_check==0){
		  _logout_();
		}else{
  
		  if (success==true){
        var student_data = response.data.data;
        var fullname = student_data.fullname;
        var last_login = student_data.last_login;
        var firstname = student_data.firstname;
        var othernames = student_data.middlename ? student_data.middlename + ' ' + student_data.lastname : student_data.lastname;
        var address = student_data.address;
        var nationality = student_data.nationality;
        var email_address = student_data.email_address;
        var mobileno = student_data.mobileno;
        var student_id = student_data.student_id;
        var reg_date = student_data.created_time;
        var p_fullname = student_data.parent_name;
        var p_phoneno = student_data.parent_mobileno;
        var entry_method = student_data.entry_code;
        var entry_method = student_data.entry_code;
        var dob = student_data.dob;

        var faculty_id = student_data.faculty_id;
        var faculty_name = student_data.faculty_name;
        var department_id = student_data.department_id;
        var department_name = student_data.department_name;
        var level_id = student_data.level_id;
        var level_code = student_data.level_code;
        var entry_year = student_data.entry_year;

        var passport = student_data.passport;
        var documentStoragePath = student_data.documentStoragePath + '/' + passport;
        
        $('#fullname').html(fullname);
        $('#last_login').html(last_login);
        $('#surname').val(firstname);
        $('#othernames').val(othernames);
        $('#address').val(address);
        $('#nationality').val(nationality);
        $('#email_address').val(email_address);
        $('#mobileno').val(mobileno);
        $('#student_id').val(student_id);
        $('#reg_date').val(reg_date);
        $('#p_fullname').val(p_fullname);
        $('#p_phoneno').val(p_phoneno);
        $('#entry_method').val(entry_method);
        $('#entry_year').val(entry_year);
        $('#dob').val(dob);

        $("#faculty_id").append('<option value="' + faculty_id + '" selected="selected">' + faculty_name +"</option>");
        $("#department_id").append('<option value="' + department_id + '" selected="selected">' + department_name +"</option>");
        $("#level_id").append('<option value="' + level_id + '" selected="selected">' + level_code +"</option>");

			  $("#student_pic").attr('src', documentStoragePath);
  
		  }
		}
	});
}

function updateFaculty(faculty_id){
  var faculty_name = $('#faculty_name').val();

  if (faculty_name==''){
      showError('FACULTY NAME ERROR!', 'Fill all Fields To Continue');
  }else{

      var btn_text  = $('#submit_btn').html();
      $('#submit_btn').html('<i id="spinner" class="bi bi-arrow-repeat"></i> SUBMITTING...');
      document.getElementById('submit_btn').disabled = true;

      var formData = 'faculty_id=' + faculty_id + '&faculty_name=' + faculty_name;
      axios.post(endpoint+'/admin/update-faculty-api?access_key='+access_key, formData, { headers: apikey })

      .then(response => {
          var access_check = response.data.check;
          var success = response.data.success;
          var message = response.data.message;
  
          if (access_check == 0) {
              _logout_(); 
          } else {
              if (success == true) {
                  $('#success-div').html('<div><i class="bi-check-all"></i></div>SUCCESS!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
                  $('#submit_btn').html(btn_text);
                  document.getElementById('submit_btn').disabled=false;
                  fetchFaculties(1, '');
                  alert_close();
              }else{
                  $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
                  $('#submit_btn').html(btn_text);
                  document.getElementById('submit_btn').disabled=false;
              }
          }
      })
      .catch(error => {
          $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + error).fadeIn(500).delay(5000).fadeOut(100);
          $('#submit_btn').html(btn_text);
          document.getElementById('submit_btn').disabled = false;
      });
  }
}

function updateDepartment(department_id){
  var department_id = $('#department_id').val();
  var faculty_id = $('#faculty_id').val();

  if (department_id==''){
      showError('DEPARTMENT ID ERROR!', 'Fill all Fields To Continue');  
  }else if (faculty_id==''){
    showError('FACULTY ID ERROR!', 'Fill all Fields To Continue');
  }else{
      var btn_text  = $('#submit_btn').html();
      $('#submit_btn').html('<i id="spinner" class="bi bi-arrow-repeat"></i> SUBMITTING...');
      document.getElementById('submit_btn').disabled = true;

      var formData = 'faculty_id=' + faculty_id + '&department_id=' + department_id;
      axios.post(endpoint+'/admin/update-department-api?access_key='+access_key, formData, { headers: apikey })

      .then(response => {
          var access_check = response.data.check;
          var success = response.data.success;
          var message = response.data.message;
  
          if (access_check == 0) {
              _logout_(); 
          } else {
              if (success == true) {
                  $('#success-div').html('<div><i class="bi-check-all"></i></div>SUCCESS!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
                  $('#submit_btn').html(btn_text);
                  document.getElementById('submit_btn').disabled=false;
                  fetchDepartment(1, '');
                  alert_close();
              }else{
                  $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
                  $('#submit_btn').html(btn_text);
                  document.getElementById('submit_btn').disabled=false;
              }
          }
      })
      .catch(error => {
          $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + error).fadeIn(500).delay(5000).fadeOut(100);
          $('#submit_btn').html(btn_text);
          document.getElementById('submit_btn').disabled = false;
      });
  }
}

function upload_pix() {
  $(function () {
    Upload = {
      UpdatePreview: function (obj) {
        if (!window.FileReader) {
          // Handle browsers that don't support FileReader
          console.error("FileReader is not supported.");
        } else {
          upload_staff_passport(staff_id);
          var reader = new FileReader();

          reader.onload = function (e) {
            $('#pictureBox2').prop("src", e.target.result);
          };

          reader.readAsDataURL(obj.files[0]);
        }
      },
    };
  });
}


function upload_staff_passport(staff_id){
  var passport_pix_input = $('#profile_pix')[0];
  var passport_pix_file = passport_pix_input.files[0];
  
  var formData = new FormData();
  formData.append('staff_id', staff_id);
  formData.append('profile_pix', passport_pix_file);
  formData.append('profile_pix', profile_pix)

  axios.post(endpoint+'/admin/passport-api?access_key='+access_key, formData, { headers: apikey })

  .then(response => {
    var access_check = response.data.check;
    var success = response.data.success;
    var message = response.data.message;

    if (access_check == 0) {
        _logout_(); 
    } else {
        if (success == true) {
            $('#success-div').html('<div><i class="bi-check-all"></i></div>SUCCESS!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
            _get_staff_login(staff_id);
        }else{
            $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + message).fadeIn(500).delay(5000).fadeOut(100);
        }
    }
})
.catch(error => {
    $('#warning-div').html('<div><i class="bi-check-all"></i></div>ERROR!' + ' ' + error).fadeIn(500).delay(5000).fadeOut(100);
});
}
  





