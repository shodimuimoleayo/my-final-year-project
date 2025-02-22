<?php if($page=='dashboard'){?>
    <div class="w-[98%] flex gap-2 mt-3 flex-wrap content-start">
        <div class="count-div">
            <div class="w-[90%] m-5 font-bold">
                <div class="text-2xl" id="total_staff">X</div>
                <div class="text-sm">TOTAL ADMIN/STAFF</div>
                <i class="bi-people-fill text-3xl"></i>
            </div>
        </div>

        <div class="count-div">
            <div class="w-[90%] m-5 font-bold">
                <div class="text-2xl" id="total_student">X</div>
                <div class="text-sm">TOTAL STUDENT</div>
                <i class="bi-mortarboard-fill text-3xl"></i>
            </div>
        </div>

        <div class="count-div">
            <div class="w-[90%] m-5 font-bold">
                <div class="text-2xl" id="total_faculty">X</div>
                <div class="text-sm">TOTAL FACULTY</div>
                <i class="bi-book-fill text-3xl"></i>
            </div>
        </div>

        <div class="count-div">
            <div class="w-[90%] m-5 font-bold">
                <div class="text-2xl" id="total_department">X</div>
                <div class="text-sm">TOTAL DEPARTMENT</div>
                <i class="bi-book-fill text-3xl"></i>
            </div>
        </div>

        <div class="count-div">
            <div class="w-[90%] m-5 font-bold">
                <div class="text-2xl" id="total_course">X</div>
                <div class="text-sm">TOTAL COURSE</div>
                <i class="bi-book-fill text-3xl"></i>
            </div>
        </div>
				
        <div class="count-div">
            <div class="w-[90%] m-5 font-bold">
                <div class="text-2xl">X</div>
                <div class="text-sm">CUMULATIVE SCHOOL FEES</div>
                <i class="bi-wallet-fill text-3xl"></i>
            </div>
        </div>
        <script>all_counts();</script>
	</div>
<?php }?>

<?php if($page=='all-staff'){?>
   <div class="w-[100%] h-[55px] text-white bg-[#EBEBEB] rounded-md font-body">
       <div class="w-[95%] h-[55px] m-auto flex justify-between items-center content-center gap-[5px] text-[10px] text-[#ABABAB]">
            <select class="w-[20%] h-[45px] bg-white pl-[20px] rounded-[5px] focus:border-black border-solid border focus:border-opacity-30 flex flex-grow" id="status_id" onchange="_all_staff(this.value)">
                <option value="">All Status</option>
                <script>_get_status();</script>
            </select>

            <select class="w-[20%] h-[45px] bg-white pl-[20px] rounded-[5px] focus:border-black border-solid border focus:border-opacity-30 flex flex-grow" onchange="">
                <option value="">All Departments</option>
            </select>

            <input class="w-[30%] h-[45px] bg-white pl-[20px] rounded-[5px] outline-none focus:border-black border-solid border focus:border-opacity-30 flex flex-grow" type="text" id="search" onkeyup="_all_staff('');" placeholder="Type here to search..." title="Type here to search"/>
        </div>

        <div class="w-[100%] h-[40px] bg-[#ECF5F0] border-solid border border-[#A0E5BD] flex justify-center">
            <div class="w-[98%] flex items-center justify-between text-[#424141]">
                <div><i class="bi-people-fill"></i>  ALL ADMINISTRATOR'S LIST</div>
                <button class="text-sm py-[5px] px-[10px] bg-[#0E4000]" title="Add new staff"  onClick="_get_form('staff_reg');">ADD NEW STAFF <i class="bi-person-plus"></i></button>
            </div>
        </div>

        <div class="w-[98%] m-auto mt-[15px] flex justify-center flex-wrap gap-[15px]" id="fetch_all_staff">
            <script>_all_staff('');</script>
        </div>
   </div>
<?php }?>


<?php if($page=='all-student'){?>
   <div class="w-[100%] h-[55px] text-white bg-[#EBEBEB] rounded-md font-body">
        <div class="w-[95%] h-[55px] m-auto flex justify-between items-center content-center gap-[5px] text-[10px] text-[#ABABAB]">
            <select class="w-[20%] h-[45px] bg-white pl-[20px] rounded-[5px] focus:border-black border-solid border focus:border-opacity-30 flex flex-grow" id="status_id" onchange="_all_student(this.value);">
                <option value="">All Status</option>
                <script>_get_status();</script>
            </select>

            <select class="w-[20%] h-[45px] bg-white pl-[20px] rounded-[5px] focus:border-black border-solid border focus:border-opacity-30 flex flex-grow" onchange="">
                <option value="">All Departments</option>
            </select>

             <select class="w-[20%] h-[45px] bg-white pl-[20px] rounded-[5px] focus:border-black border-solid border focus:border-opacity-30 flex flex-grow" onchange="">
                <option value="">All Levels</option>
            </select>
            <input class="w-[30%] h-[45px] bg-white pl-[20px] rounded-[5px] outline-none focus:border-black border-solid border focus:border-opacity-30 flex flex-grow" type="text" id="search" onkeyup="_all_student('');" placeholder="Type here to search..." title="Type here to search"/>
        </div>

        <div class="w-[100%] h-[40px] bg-[#ECF5F0] border-solid border border-[#A0E5BD] flex justify-center">
            <div class="w-[98%] flex items-center justify-between text-[#424141]">
                <div><i class="bi-people-fill"></i>  ALL STUDENT'S LIST</div>
            </div>
        </div>

        <div class="w-[98%] m-auto mt-[15px] flex justify-center flex-wrap gap-[15px]" id="fetch_all_student">
            <script>_all_student('');</script>
        </div>
   </div>  
<?php }?>

<?php if($page=='faculty-module'){?>
   <div class="w-[100%] h-[55px] text-white bg-[#EBEBEB] rounded-md font-body">
        <div class="w-[95%] mx-[auto]">
            <input class="w-[100%] h-[40px] mt-[7.5px] outline-none px-[10px] text-black/50 rounded-md focus:border border-black/30" type="text" id="search" onkeyup="fetchFaculties(1, '')"/>
        </div>

        <div class="w-[100%] h-[40px] bg-[#ECF5F0] mt-[7px] border-solid border border-[#A0E5BD] flex justify-center">
            <div class="w-[98%] flex items-center justify-between text-[#424141]">
                <div><i class="bi-cash-coin"></i>  ALL FACULTY LIST</div>
                <button class="text-sm py-[5px] px-[10px] bg-[#0E4000]" title="Add new faculty"  onClick="_get_form('add-faculty');">ADD NEW FACULTY <i class="bi-cash-coin"></i></button>
            </div>
        </div>

        <div class="w-[98%] m-auto mt-[10px]" id="fetch_all_faculty">
            <script>fetchFaculties(1, '');</script> 
        </div>
   </div>  
<?php }?>

<?php if($page=='department-module'){?>
   <div class="w-[100%] h-[55px] text-white bg-[#EBEBEB] rounded-md font-body">
        <div class="w-[95%] mx-[auto]">
            <input class="w-[100%] h-[40px] mt-[7.5px] outline-none px-[10px] text-black/50 rounded-md focus:border border-black/30" type="text" id="search" onkeyup="fetchDepartment(1, '')"/>
        </div>

        <div class="w-[100%] h-[40px] bg-[#ECF5F0] mt-[7px] border-solid border border-[#A0E5BD] flex justify-center">
            <div class="w-[98%] flex items-center justify-between text-[#424141]">
                <div><i class="bi-cash-coin"></i>  ALL DEPARTMENT LIST</div>
                <button class="text-sm py-[5px] px-[10px] bg-[#0E4000]" title="Add new staff"  onClick="_get_form('add-department');">ADD NEW DEPARTMENT <i class="bi-cash-coin"></i></button>
            </div>
        </div>

        <div class="w-[98%] m-auto mt-[10px]" id="fetch_all_department">
            <script>fetchDepartment(1, '');</script>
        </div>
   </div>  
<?php }?>


<?php if($page=='student-profile'){?>
    <div class="mt-[60px] mb-[150px] log-div" id="student-profile">
        <div class="text-[14px] font-bold text-primary-color pl-[10px] pb-[15px] border-b border-primary-color">BASIC INFORMATION</div>

        <div class="mt-[10px] text-[12px] flex gap-[5px]">
            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> SURNAME:</label><br/>
                <input class="formInput" type="text" id="surname" placeholder="SURNAME"/>
            </div>

            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> OTHER NAMES:</label><br/>
                <input class="formInput" type="text" id="othernames" placeholder="OTHER NAMES"/>
            </div>
        </div>

        <div class="mt-[10px] text-[12px] flex gap-[5px]">
            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> DATE OF BIRTH:</label><br/>
                <input class="formInput" type="date" id="dob" placeholder="DATE OF BIRTH"/>
            </div>

            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> GENDER:</label><br/>
                <select class="formInput" id="gender_id">
                    <script>_get_gender();</script>
                </select>
            </div>

            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> RELIGION AFFILIATION:</label><br/>
                <select class="formInput" id="religion">
                   
                </select>
            </div>
        </div>

        <div class="text-[14px] font-bold text-primary-color pl-[10px] pb-[15px] mt-[50px] border-b border-primary-color">CONTACT INFORMATION</div>
        <div class="mt-[10px] text-[12px] flex gap-[5px]">
            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> NATIONALITY:</label><br/>
                <input class="formInput" type="text" id="nationality" placeholder="NATIONALITY"/>
            </div>

            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> STATE OF ORIGIN:</label><br/>
                <select class="formInput" id="">
                    
                </select>
            </div>

            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> LOCAL GOVT. AREA:</label><br/>
                <select class="formInput" id="">
                    
                </select>
            </div>
        </div>
        <div class="w-[100%]">
            <label class="px-[15px] text-gray-500"> RESIDENTIAL ADDRESS:</label><br/>
            <input class="formInput" type="text" id="address" placeholder="ADDRESS"/>
        </div>
        <div class="mt-[10px] text-[12px] flex gap-[5px]">
            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> EMAIL ADDRESS:</label><br/>
                <input class="formInput" type="email" id="email_address" placeholder="EMAIL ADDRESS"/>
            </div>

            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> PHONE NUMBER:</label><br/>
                <input class="formInput" type="tel" id="mobileno" placeholder="PHONE NUMBER"/>
            </div>
        </div>

        <div class="text-[14px] font-bold text-primary-color pl-[10px] pb-[15px] mt-[50px] border-b border-primary-color">PARENT/GUARDIAN INFORMATION</div>

        <div class="mt-[10px] text-[12px] flex gap-[5px]">
            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> PARENT FULLNAME:</label><br/>
                <input class="formInput" type="text" id="p_fullname" placeholder="PARENT FULLNAME"/>
            </div>

            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> PARENT PHONE NUMBER:</label><br/>
                <input class="formInput" type="text" id="p_phoneno" placeholder="PARENT PHONE NUMBER"/>
            </div>
        </div>

        <div class="text-[14px] font-bold text-primary-color pl-[10px] pb-[15px] mt-[50px] border-b border-primary-color">ACCOUNT INFORMATION</div>

        <div class="mt-[10px] text-[12px] flex gap-[5px]">
           <div class="w-[100%]">
                <label class="px-[10px] text-primary-color"> FACULTY:</label><br/>
                <select class="formInput" id="faculty_id">
                    <option>Select Faculty</option>
                    <script>_get_faculty();</script>
                </select>
            </div>

            <div class="w-[100%]">
                <label class="px-[10px] text-primary-color"> DEPARTMENT:</label><br/>
                <select class="formInput" id="department_id">
                    <option>Select Department</option>
                    <script>
                        $('#faculty_id').on('change', function() {
                        var faculty_id = $(this).val(); 
                            _get_department(faculty_id); 
                        });
                    </script>
                </select>
            </div>
        </div>

        <div class="mt-[10px] text-[12px] flex gap-[5px]">
            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> ENTRY METHOD:</label><br/>
                <div class="relative flex items-center">
                    <input class="formInput" type="text" readonly="readonly" id="entry_method" placeholder="ENTRY METHOD"/>
                    <i class="bi-lock-fill absolute right-3 text-primary-color"></i>
                </div>
            </div>

            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> LEVEL:</label><br/>
                <select class="formInput" id="level_id">
                    
                </select>
            </div>

            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> ENTRY YEAR:</label><br/>
                <div class="relative flex items-center">
                    <input class="formInput" type="text" readonly="readonly" id="entry_year" placeholder="ENTRY YEAR"/>
                    <i class="bi-lock-fill absolute right-3 text-primary-color"></i>
                </div>
            </div>
        </div>
                
        <div class="mt-[10px] text-[12px] flex gap-[5px]">
            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> MATRIC NUMBER:</label><br/>
                <div class="relative flex items-center">
                    <input class="formInput" type="text" readonly="readonly" id="student_id" placeholder="MATRIC NUMBER"/>
                    <i class="bi-lock-fill absolute right-3 text-primary-color"></i>
                </div>
            </div>

            <div class="w-[100%]">
                <label class="px-[15px] text-gray-500"> DATE OF REGISTRATION:</label><br/>
                <div class="relative flex items-center">
                    <input class="formInput" type="text" readonly="readonly" id="reg_date" placeholder="DATE OF REGISTRATION"/>
                    <i class="bi-lock-fill absolute right-3 text-primary-color"></i>
                </div>
            </div>
        </div>
        <button class="w-[15%] float-right mt-[20px]" id="submit_btn" title="" onclick="_update_student_data('<?php echo $ids;?>')">UPDATE PROFILE <i class="bi-check2"></i></button>
    </div>


    <div class="mt-[60px] mb-[100px] shadow-table-box-border hidden log-div" id="payment-history">
        <table class="w-[100%] border-collapse">
            <thead>
                <tr>
                    <th>SN</th>
                    <th>DATE</th>
                    <th>TRANSACTION ID</th>
                    <th>(#)AMOUNT</th>
                    <th>STATUS</th>
                    <th>PAYMENT METHOD</th>
                </tr>
            </thead>
            <tbody class="bg-white">
                <tr>
                    <td>1</td>
                    <td>2023-09-18 01:01:29</td>
                    <td> CLN202406051207410022345645672</td>
                    <td>N 26,000.00</td>
                    <td>PENDING</td>
                    <td>CREDIT CARD</td>
                </tr>
            </tbody>
        </table>
    </div>
<?php }?>

<?php include 'aos-script.php';?>


<script>
    superplaceholder({
        el: search,
            sentences: [ 'Type here to search'],
            options: {
            letterDelay: 80,
            loop: true,
            startOnFocus: false
        }
    });
</script>



  

