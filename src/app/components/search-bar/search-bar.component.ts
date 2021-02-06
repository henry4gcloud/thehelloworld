import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'gt-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input()
  value = '';
  @Output()
  valueChange = new EventEmitter<string>();
  @Output()
  complete = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  triggerComplete() {
    this.valueChange.emit(this.value);
    this.complete.emit();

  }
}
