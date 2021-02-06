import {
  Component,
  ComponentFactoryResolver,
  ComponentRef, Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Templatable} from '../Templatable';
import {Template} from '../Template';
import {TemplateAccessibilityTableScopeRule} from 'codelyzer';

@Component({
  selector: 'gt-component-container',
  templateUrl: './component.container.html',
  styleUrls: ['./component.container.scss']
})
// tslint:disable-next-line:component-class-suffix
export class ComponentContainer implements OnInit, Templatable {

  protected componentRefs: Array<ComponentRef<any>> = [];

  @ViewChild('container', {read: ViewContainerRef, static: true})
  container: ViewContainerRef;

  @Input()
  data: any;
  @Input()
  type: Type<Templatable>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    if (this.type) {
      this.addComponent(this.type);
    }
  }

  addComponent(componentClass: Type<Templatable>, index?: number): void {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component: ComponentRef<any> = this.container.createComponent(componentFactory, index);
    // component.data

    // Push the component so that we can keep track of which components are created
    this.componentRefs.push(component);
  }

  protected removeComponent(index?: number): void {
    if (index === null || index === undefined || this.componentRefs.length > index) {
      // Remove component from both view and array
      this.container.remove(index);
      this.componentRefs.splice(index, 1);
    }
  }

  toTemplate(): Template {
    const type = ComponentContainer; // this.constructor
    let children: Array<Template>;
    if (this.componentRefs.length > 0){
      children =  this.componentRefs.map( componentRef => {
        const instance: Templatable = componentRef.instance;
        return instance.toTemplate();
      });
    }
    return {type, children};
  }


}
