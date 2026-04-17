// ============ UV  ============
float aspectRatio = Resolution.x / Resolution.y;
float mosaicUVx = floor(TexCoord.x * MosaicSize * aspectRatio) / (MosaicSize * aspectRatio);
float mosaicUVy = floor(TexCoord.y * MosaicSize) / MosaicSize;
float2 mosaicUV = float2(mosaicUVx, mosaicUVy);
float2 pixelPos = TexCoord*Resolution;

// ============ COLOR  ============
float4 mosaicColor = SceneTextureLookup(ViewportUVToSceneTextureUV(mosaicUV,14), 14, false);

//  ============ DITHER  ============
float2 coord = frac(pixelPos / DitherVisibility);
float threshold = DitherTex.SampleLevel(View.MaterialTextureBilinearClampedSampler, coord, 0).r;
float dither = (threshold - 0.5) * DitherStrength;

// ============ QUANTIZATION  ============
float levels = max(ColorCount, 2.0);
float3 colorDithered = mosaicColor.rgb + (dither / levels);
float3 quantized = floor(colorDithered * levels) / (levels - 1.0);
quantized = saturate(quantized);

return quantized;
