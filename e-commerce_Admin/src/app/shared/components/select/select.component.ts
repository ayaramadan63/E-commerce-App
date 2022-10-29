import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() title: string = '';  // input for get data from parent
  @Input() data: any[] = [];     
  @Output() selectedValue = new EventEmitter(); // output for send data from child to parent
  @Input() all: boolean = true;
  @Input() select = '';



  constructor() { }

  ngOnInit(): void {
  }

  detectChanges(event: any) {

    this.selectedValue.emit(event);
  }

}
