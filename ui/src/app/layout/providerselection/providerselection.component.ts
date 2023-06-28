import { Component } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ModelInfoService } from '../../shared/services/model-info.service';

@Component({
    selector: 'app-providerselection',
    templateUrl: './providerselection.component.html',
    styleUrls: ['./providerselection.component.scss'],
    animations: [routerTransition()]
})
export class ProviderSelectionComponent {
    // Application showcase images
    public sliders: Array<any> = [];

    // Sources of geological models
    public sources: any;

    constructor(private modelInfoService: ModelInfoService) {
        this.sliders.push(
            {
                imagePath: 'assets/images/auspass-carousel.png',
                text: 'Seismic',
                label: 'AusPass Network'
            },
            {
                imagePath: 'assets/images/avre-carousel.png',
                text: 'AuScope Portal',
                label: 'AuScope Portal'
            },
            {
                imagePath: 'assets/images/sam-carousel.png',
                text: 'Solid Earth',
                label: 'Underworld2'
            },
            {
                imagePath: 'assets/images/Otway.png',
                text: 'AuScope 3D Geomodels Portal',
                label: 'Otway Basin Model'
            },
            {
                imagePath: 'assets/images/iEarth-carousel.png',
                text: 'iEarth Software',
                label: 'iEarth Geophysics & Seismology'
            }
        );
        this.modelInfoService.getProviderInfo().then(res => { this.sources = res; });
    }

}
