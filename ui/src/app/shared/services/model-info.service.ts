//
// This service is used to retrieve information about the model from the config files, borehole web services,
// and to read/write the model parts' state
//

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable ,  Subject } from 'rxjs';


export interface ProviderInfo {
    name: string;
    numberModels: number;
    icon: string;
    colourClass: string;
    providerPath: string;
    infoUrl: string;
}

export const FIXED_HEIGHT = -1.0;

// What has changed in the model part's state?
export enum  ModelPartStateChangeType { DISPLAYED, TRANSPARENCY, HEIGHT_OFFSET, VOLUME_SLICE, RESCALE }

export enum  ModelControlEventEnum { RESET_VIEW, MOUSE_GUIDE, COMPASS_ROSE, MOVE_VIEW }

// Used for communicating model control events from user interface to modelview
export interface ModelControlEvent {
    type: ModelControlEventEnum;
    new_value: any;
}


// Vessel for communicating change, note limitation: only one change at a time
export interface ModelPartStateChange {
    type: ModelPartStateChangeType;
    new_value: any;
}

// Callback function used to get information about a state change in the model
export type ModelPartCallbackType =  (groupName: string, modelUrl: string, state: ModelPartStateChange) => any;

/**
 * Class used to share model state information between components (e.g. which parts are visible, transparency & displacement values)
 */
@Injectable()
export class ModelInfoService {
    private providerModelInfo = {};
    private providerInfoList: ProviderInfo[] = [];

    // Set to true once service has been initialised
    private initialised = false;

    // An attempt to make sure loaded files are cached so that files are not downloaded
    // multiple times
    private modelCache = {};

    // A callback used when some part of the model changes
    // Only one callback can be registered at a time
    private modelPartCallback: ModelPartCallbackType;

    // Stores the current state of the model parts
    private modelPartState = {};

    // Subject for catching model control events
    private modelControlEventSub = new Subject<ModelControlEvent>();

    // A promise to provider inform data and initialise
    private initPromise: Promise<any> = null;

    // A promise to fetch model data
    private modelPromise: Promise<any> = null;

    // Used to fetch a list of borehole ids
    private boreholeIdList = [];
    private bhPromise: Promise<any> = null;

    // Used to inform of a camera position change
    private cameraPosSub = new Subject<[number, number, number, string]>();

    constructor(private httpService: HttpClient) {
    }

    /**
     * Initialise service
     */
    private initialise() {
        const local = this;
        if (!this.initPromise) {
            this.initPromise =  new Promise(function(resolve, reject) {
                local.httpService.get('./assets/geomodels/ProviderModelInfo.json').subscribe(
                    data => {
                        local.providerModelInfo = data as string [];
                        local.providerInfoList = [];
                        for (const providerKey in local.providerModelInfo) {
                            if (local.providerModelInfo.hasOwnProperty(providerKey)) {
                                const providerInfo: ProviderInfo = { name: local.providerModelInfo[providerKey].name,
                                                                 numberModels: local.providerModelInfo[providerKey].models.length,
                                                                 icon: local.providerModelInfo[providerKey].icon,
                                                                 colourClass: local.providerModelInfo[providerKey].colourClass,
                                                                 providerPath: providerKey,
                                                                 infoUrl: local.providerModelInfo[providerKey].infoUrl
                                                             };
                                local.providerInfoList.push(providerInfo);
                            }
                        }
                        local.initialised = true;
                        resolve([local.providerModelInfo, local.providerInfoList]);
                    },
                    (err: HttpErrorResponse) => {
                        console.error('Cannot load provider model JSON file', err);
                        reject(err);
                    }
                );
            });
        }
        return this.initPromise;
    }


    /**
     * Builds an HTTP GET URL using parameters
     * @param params parameters Javascript object with key-val pairs
     * @return URL string
     */
    public buildURL(params): string {
        return Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');
    }




    /**
     * Retrieves the provider model information from the model information
     * @return a promise of the provider model information in JSON format
     */
    public async getProviderModelInfo() {
        const local = this;
        if (this.initialised) {
            return new Promise(resolve => resolve(local.providerModelInfo));
        }
        const result = await this.initialise();
        return new Promise(resolve => resolve(result[0]));
    }

    /**
     * Retrieves the provider information from the model information
     * @return a promise of the provider information in JSON format
     */
    public async getProviderInfo() {
        const local = this;
        if (this.initialised) {
            return new Promise(resolve => resolve(local.providerInfoList));
        }
        const result = await this.initialise();
        return new Promise(resolve => resolve(result[1]));
    }

}
