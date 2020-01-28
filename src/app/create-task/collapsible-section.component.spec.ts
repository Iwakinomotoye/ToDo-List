import { CollapsibleSectionComponent } from './collapsible-section.component';

describe('CollapsibleSectionComponent', () => {
    let collapsibleSectionComponent: CollapsibleSectionComponent;
    beforeEach(() => {
        collapsibleSectionComponent = new CollapsibleSectionComponent();
    });
    describe('ngOnChanges', () => {
        it('should set visible to true if TaskIn has a property id', () => {
            // if you try to clean the id property of TaskIn you would observe that the 
            // brower show that collapsibleSectionComponent.visible is still false
            collapsibleSectionComponent.TaskIn = { id: 4 }
            collapsibleSectionComponent.visible = false;

            collapsibleSectionComponent.ngOnChanges();

            expect(collapsibleSectionComponent.visible).toBe(true);
        });

        // i did not write a test for scrollTop because i dont know how and i dont know if
        // it is necessary.
    });

    describe('toggleVisible', () => {
        it('should set visible to not visible and vice-versa', () => {
            collapsibleSectionComponent.visible = true;

            collapsibleSectionComponent.toggleVisible();

            expect(collapsibleSectionComponent.visible).toBe(false);
        });
    });
});
