import { Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.css']
})
export class SvgIconComponent {
  @Input() path!: string
  @Input() iconWidth!: string
  @Input() class!: string
}

