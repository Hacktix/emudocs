import { CSSProperties } from "react";
import "./MemoryMap.css";

export type ColorRGB = {
    r: number,
    g: number,
    b: number
};

export type MemoryRegion = {
    name: string,
    startAddress: number,
    endAddress: number,
    description?: string,
    color?: ColorRGB
}

export type MemoryMapProps = {
    maxAddress: number,
    regions: MemoryRegion[],
    addressRadix?: number,
    addressPrefix?: string
}

type MemoryRegionProps = {
    region: MemoryRegion,
    addressRadix: number,
    addressLength: number,
    addressPrefix: string,
    style?: CSSProperties
}


function MemoryRegion(props: MemoryRegionProps) {
    const formatAddress = (address: number) => props.addressPrefix + address.toString(props.addressRadix).padStart(props.addressLength, "0").toUpperCase();
    const desc = props.region.description ? props.region.description : null;
    return (
        <div className="MemoryRegion" style={props.style}>
            <div className="AddressLabel">
                <div className="StartAddressLabel">{formatAddress(props.region.startAddress)}</div>
                <div className="EndAddressLabel">{formatAddress(props.region.endAddress)}</div>
            </div>
            <div className="RegionTitle">
                <h3>{props.region.name}</h3>
                {desc}
            </div>
        </div>
    );
}

const RGBtoCSS = (color: ColorRGB) => `rgb(${color.r},${color.g},${color.b})`;

export default function MemoryMap(props: MemoryMapProps) {
    const radix = props.addressRadix || 16;
    const addrLen = props.maxAddress.toString(radix).length;
    const addrPrefix = props.addressPrefix || "";

    const padRegions: MemoryRegion[] = [];
    props.regions.forEach((region, idx) => {
        const lastEndAddr = idx === 0 ? -1 : props.regions[idx-1].endAddress;
        if(region.startAddress !== lastEndAddr + 1) {
            padRegions.push({
                name: "Unknown",
                startAddress: lastEndAddr + 1,
                endAddress: region.startAddress - 1
            });
        }
    });
    if(props.regions[props.regions.length - 1].endAddress !== props.maxAddress)
        padRegions.push({
            name: "Unknown",
            startAddress: props.regions[props.regions.length - 1].endAddress + 1,
            endAddress: props.maxAddress
        });
    const paddedRegions = props.regions.concat(padRegions).sort((a, b) => a.startAddress - b.startAddress);

    return (
        <div className="MemoryMapContainer">
            {paddedRegions.map(region => {
                const style: CSSProperties = {};
                if(region.color)
                    style.backgroundColor = RGBtoCSS(region.color);
                return <MemoryRegion
                    key={`MemRegion_${region.startAddress}_${region.name}`}
                    style={style}
                    region={region}
                    addressRadix={radix}
                    addressLength={addrLen}
                    addressPrefix={addrPrefix}
                />;
            })}
            <div className="MemoryMapBottom" />
        </div>
    );
};