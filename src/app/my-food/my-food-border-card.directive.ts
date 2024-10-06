import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[myFoodBorderCard]',
    standalone: true
})
export class MyFoodBorderCardDirective {
    private initialColor: string = '#f5f5f5';
    private borderColor: string = '#009688';
    private defaultHeight: number = 150;

    constructor(private el: ElementRef) { // référence vers l'élément du dom sur lequel va s'appliquer la directive
        this.setColor(this.initialColor);
        this.setHeight(this.defaultHeight);
    }

    @Input('myFoodBorderCard') templateBorderColor: string; // il faut l'importer en haut, c'est pour changer la couleur depuis le template

    @HostListener('mouseenter') onMouseEnter() {
        this.setColor(this.templateBorderColor || this.borderColor)
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.setColor(this.initialColor)
    }

    setColor(color: string) {
        this.el.nativeElement.style.border = `solid 4px ${color}`;
    }

    setHeight(height: number) {
        this.el.nativeElement.style.height = `${height}px`;
    }

}