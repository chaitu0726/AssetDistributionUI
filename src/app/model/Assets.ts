export class UserAssignAssset
{
    constructor(
        public assetKey:string,
        public assetName:string,
        public assetCount:number
    ){}
}

export class AssetInfo//Assets in java
{
    constructor(
            public assetsid:number,
            public assetkey:string,
            public assetName:string,
            public assignedAssets:number,
            public availableAssets:number,
            public totalAssets:number
    ){}
}

export class AssetsDistribute
{
    constructor(
        public assetkey:string,
        public count:number
    ){}
}

export class AssetAssign
{
    constructor(
        public assetList:UserAssignAssset[],
        public userId:number
    ){}
}

export class AssetRecord 
{
    constructor(
        public assetKey:string,
        public assetType:string,
        public assetInfo:string
    ){}
}

export class RecommandedAssets //List for Recommanded
{
    constructor(
        public assetName:string,
        public assetCount:number
    ){}
}

export class AssetsDropDown
{
    constructor(
        public assetName:string,
        public assetTypes:UserAssignAssset[]
    ){}
}

