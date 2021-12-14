import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  formSendEmail!: any;
  submittedEmail: boolean = false;

  constructor(private emailService: EmailService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formSendEmail = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  get emailSend() {
    return this.formSendEmail.get('email');
  }

  sendEmail() {
    this.submittedEmail = true;
    if (this.formSendEmail.invalid) {
      alert(
        'Đã có lỗi xảy ra trong quá trình xử lý! Vui lòng kiểm tra lại các thông tin đã điền.'
      );
    } else {
      this.emailService.sendEmail(this.formSendEmail.value);
      this.submittedEmail = false;
      this.formSendEmail.reset();
    }
  }
}
