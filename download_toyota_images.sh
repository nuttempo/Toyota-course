#!/bin/bash
# Download official Toyota Thailand images and convert to JPG
# Usage: bash download_toyota_images.sh

set -euo pipefail

OUTDIR="public/images"
mkdir -p "$OUTDIR"

download() {
    local code="$1"
    local url="$2"
    local tmpfile="$OUTDIR/_${code}.webp"
    local outfile="$OUTDIR/${code}.jpg"
    
    echo -n "  $code ... "
    if curl -sfL --max-time 30 "$url" -o "$tmpfile" 2>/dev/null; then
        if sips --setProperty format jpeg "$tmpfile" --out "$outfile" > /dev/null 2>&1; then
            sips --resampleWidth 1200 "$outfile" --out "$outfile" > /dev/null 2>&1
            local size
            size=$(stat -f%z "$outfile" 2>/dev/null || stat -c%s "$outfile" 2>/dev/null)
            rm "$tmpfile"
            echo "OK (${size} bytes)"
        else
            echo "FAILED (conversion)"
            rm -f "$tmpfile"
        fi
    else
        echo "FAILED (download)"
    fi
}

echo "Downloading images from Toyota Thailand..."

# yaris group
download yaris "https://www.toyota.co.th/media/product/series/v/736/model/1dea65bfaf4b381d48c507e6a7f801cd8926878db5a8f59875a0333370f54345.webp"
download yarisativ "https://www.toyota.co.th/media/product/series/banners/v/yarisativ/68/lead/f4270d1f7624d9f46a2dc0539537b98eb60cdfdb030dc61ab8f3dce65fc5d666.webp"
download yarisativ_nightshade "https://www.toyota.co.th/media/product/series/v/736/model/249e2ff19dcc13208c98886ff2acb747d8d7f735aa817dda2a6ab879baacf754.webp"
download yariscross "https://www.toyota.co.th/media/product/series/v/736/model/72144dce8eeb1fa489d53ec20da1b12ed7bdb5f24f7dbfb347bb2c1565fc7620.webp"
download yariscross_nightshade "https://www.toyota.co.th/media/product/series/v/736/model/72144dce8eeb1fa489d53ec20da1b12ed7bdb5f24f7dbfb347bb2c1565fc7620.webp"
# altis
download altis "https://www.toyota.co.th/media/product/series/banners/v/altis/19/lead/aa4b7e8a4554a1f562873542a598a88810b45f213751e6aecbec9bb7ce56a689.webp"
download altis_grsport "https://www.toyota.co.th/media/product/series/banners/v/altis/19/lead/aa4b7e8a4554a1f562873542a598a88810b45f213751e6aecbec9bb7ce56a689.webp"
# camry
download camry "https://www.toyota.co.th/media/product/series/banners/v/camry/40/lead/a20285157d9d40994a256821d4e0c2e1627d05bdfca0988f1e863060cb78b1b2.webp"
# corolla cross
download corollacross "https://www.toyota.co.th/media/product/series/banners/v/corollacross/32/lead/70da39eb8d8aade5a590fe3ad674b856bc5b725a9ea9ec7c79aa40b6d49f61e6.webp"
download corollacross_grsport "https://www.toyota.co.th/media/product/series/banners/v/corollacross/32/lead/70da39eb8d8aade5a590fe3ad674b856bc5b725a9ea9ec7c79aa40b6d49f61e6.webp"
# ev / performance
download bz4x "https://www.toyota.co.th/media/product/series/banners/v/bz4x/31/lead/9044881a4e488bd8c7a2616c76d06883a6608d7082341ee1579b41069cd7c7c1.webp"
download gryaris "https://www.toyota.co.th/media/product/series/banners/v/gryaris/21/lead/f4cbf22d6cd5ef3b6eb9eba6896e788677f03a8d847c91c81856ecfa6bc807b8.webp"
download grcorolla "https://www.toyota.co.th/media/product/series/banners/v/grcorolla/35/lead/cc39bf38b0a238ba8105bfc9062ebe6d08addd0d7121342582ed80541ba027ec.webp"
download gr86 "https://www.toyota.co.th/media/product/series/banners/v/gr86/19/lead/f0c9a67991a47a2f992c7430541064fa58112365b382c2d30a7175f48a6946e0.webp"
download grsupra "https://www.toyota.co.th/media/product/series/banners/v/grsupra/26/lead/488159ba9b053b2ea817e876a5827e35cf7b15abc03e3f03b6483b0c63b7c5ad.webp"
# fortuner
download fortuner_leader "https://www.toyota.co.th/media/product/series/banners/v/fortuner_leader/47/lead/9574000941d52ec2937fb026a66be24f201d46307c56b6e2c53fd0d4b3dd9909.webp"
download fortuner_legender "https://www.toyota.co.th/media/product/series/banners/v/fortuner_legender/64/lead/1012fb6f6582e40498879184b1594fccd7d6748c96c5586ee2fdba01725f1aa4.webp"
download fortuner_grsport "https://www.toyota.co.th/media/product/series/banners/v/fortuner_grsport/209/lead/7230afc42e7ea93d4cf864bbc4926daee8cc8616dc25f6080f4a5625482136ff.webp"
# hilux
download hilux_champ "https://www.toyota.co.th/media/product/series/banners/v/hilux_champ/41/lead/4878d02c25fbc2ed09161ef1c0d76a616dbfe50ad5b2398abd548da64944b6b3.webp"
download hilux_revo_standard "https://www.toyota.co.th/media/product/series/banners/v/hilux_revo_standard/200/lead/f904d79c18315c5ba2c4a4d452ab738b7aa732cf5eb9540194c8052e35d902f5.webp"
download hilux_revo_zedition "https://www.toyota.co.th/media/product/series/banners/v/hilux_revo_zedition/202/lead/1a58c77d820d9ee7181523903a6a1826926a39ff6c63ad90e02b14b2663d56b3.webp"
# hilux travo variants - use hilux_revo_standard image
download hilux_travo_standard_4trex "https://www.toyota.co.th/media/product/series/banners/v/hilux_revo_standard/200/lead/f904d79c18315c5ba2c4a4d452ab738b7aa732cf5eb9540194c8052e35d902f5.webp"
download hilux_travo_prerunner_4trex "https://www.toyota.co.th/media/product/series/banners/v/hilux_revo_standard/200/lead/f904d79c18315c5ba2c4a4d452ab738b7aa732cf5eb9540194c8052e35d902f5.webp"
download hilux_travo_overland "https://www.toyota.co.th/media/product/series/banners/v/hilux_revo_standard/200/lead/f904d79c18315c5ba2c4a4d452ab738b7aa732cf5eb9540194c8052e35d902f5.webp"
download hilux_travo_e "https://www.toyota.co.th/media/product/series/banners/v/hilux_revo_standard/200/lead/f904d79c18315c5ba2c4a4d452ab738b7aa732cf5eb9540194c8052e35d902f5.webp"
# mpv / van
download innovazenix "https://www.toyota.co.th/media/product/series/banners/v/innovazenix/29/lead/46a03daf4c9505da9eec96074e138b34a1fe560e3f2fa13019eb2e42cf6d7a30.webp"
download veloz "https://www.toyota.co.th/media/product/series/banners/v/veloz/51/lead/2ebe8008b517d1d8ef3c20089d92152a571f304d7517f969fca08b6ba8b276b1.webp"
download alphard "https://www.toyota.co.th/media/product/series/banners/v/alphard/27/lead/3ff3f9aa86eb96b4803c657312e52c1912c4bb529075ec4fecf5c6f1afd69430.webp"
download hiace "https://www.toyota.co.th/media/product/series/banners/v/hiace/214/lead/feeee98611d4999063291757a3f3aefcb6e97eca8d29c9481a85b8b438fdeef9.webp"
download commuter "https://www.toyota.co.th/media/product/series/banners/v/commuter/197/lead/16f5f6ef4b2476db200edccb5ac7f76f9e02c38d0f53fd1c437d7b5ca7027c41.webp"
download majesty "https://www.toyota.co.th/media/product/series/banners/v/majesty/193/lead/5d71e7a6f46b3e76f5b9c1c31b776a29fb6d3160e25edbe72b63f55f5f8fce09.webp"

# Land Cruiser FJ - not on toyota.co.th consumer site, skip

echo ""
echo "Done! Cleaning up old 480px variants..."
rm -f "$OUTDIR"/*-480.jpg
echo "Removed old 480px variants (will regenerate)"
