// Article images — hero + supporting photography per article, curated from
// real Wraptors builds (see Wraptors Media/SEO). Keyed by heroImageKey /
// supportingImageKeys on each article in articles.js. Where two articles
// share a photo, the same imported binding is reused under both keys
// rather than importing the file twice.
import wraps1   from '../../Wrappin(1new).jpeg';
import wraps2   from '../../Wraptors Media/Wrappin(2new).jpeg';
import wraps3   from '../../Wrapping Last_3.jpeg';
import ppf1     from '../../PPF(last_1).jpeg';
import ppf2     from '../../PPF(2New).jpeg';
import ppf3     from '../../PPF(3New).jpeg';
import ceramic1 from '../../Ceramic Coating(new1).jpeg';
import ceramic2 from '../../Ceramic Coating(new2).jpeg';
import ceramic3 from '../../Ceramic Coating(new3).jpeg';
import tint1    from '../../tint.jpeg';

// ── Wraps — matching colour-change/wrap pairs ──
import wrapsUrusFront    from '../../Wraptors Media/SEO/615282331_18384175495146462_6836036317668288169_n.jpg';
import wrapsPorscheRear  from '../../Wraptors Media/SEO/590490085_18380751268146462_7355532968410105040_n.jpg';
import wrapsPorscheFront from '../../Wraptors Media/SEO/600185338_18380751301146462_6113531906848305695_n.jpg';
import wrapsCyberPair    from '../../Wraptors Media/SEO/613630978_18383866354146462_8503766934740585248_n.jpg';
import wrapsCyberPink    from '../../Wraptors Media/SEO/613757111_18383866375146462_7592111989810028623_n.jpg';
import wrapsCyberTeal    from '../../Wraptors Media/SEO/612991029_18383866429146462_4563566039101795191_n.jpg';
import wrapsEscaladePair from '../../Wraptors Media/SEO/631707045_18389471194146462_7434077227168831753_n.jpg';
import wrapsGhostPairA   from '../../Wraptors Media/SEO/669707176_18345418552214382_292233616949467455_n.jpg';
import wrapsGhostPairB   from '../../Wraptors Media/SEO/656287116_18130490575541296_3856015065945991966_n.jpg';
import wrapsAventadorA   from '../../Wraptors Media/SEO/489424808_18350175442146462_5601746349870803356_n.jpg';
import wrapsAventadorB   from '../../Wraptors Media/SEO/489844428_18350175424146462_931361750991241474_n.jpg';

// ── PPF — clean, unwrapped paint (McLaren pair, Rolls-Royce carbon hood) ──
import ppfMcLarenBlueA   from '../../Wraptors Media/SEO/670913335_18399959998146462_1677163642485172556_n.jpg';
import ppfMcLarenBlueB   from '../../Wraptors Media/SEO/671122121_18399960022146462_7469752519608954049_n.jpg';
import ppfMcLarenBlueC   from '../../Wraptors Media/SEO/671202322_18399960058146462_675058640971903733_n.jpg';
import ppfRollsCarbon    from '../../Wraptors Media/SEO/530215138_18364031836146462_7085153531933885482_n.jpg';
import ppfMcLarenWhiteA  from '../../Wraptors Media/SEO/720475297_18407063683146462_6668819874589458979_n.jpg';
import ppfMcLarenWhiteB  from '../../Wraptors Media/SEO/720971946_18407063674146462_4924605224497444225_n.jpg';

// ── Ceramic — gloss/finish detail (Maybach pair, Brabus G800 details) ──
import ceramicMaybachA   from '../../Wraptors Media/SEO/756604022_18414172291146462_2625179445833555766_n.jpg';
import ceramicMaybachB   from '../../Wraptors Media/SEO/755105131_18414172345146462_8718746965515323961_n.jpg';
import ceramicBrabusWheel from '../../Wraptors Media/SEO/561235066_18371224444146462_3625533511021440012_n.jpg';
import ceramicBrabusGrille from '../../Wraptors Media/SEO/562358916_18371224417146462_5676164616502174510_n.jpg';
import ceramicBentleyRain from '../../Wraptors Media/SEO/466695333_18332315122146462_1861722975362557767_n.jpg';

// ── Tint — visible dark film on glass ──
import tintAudiRS from '../../Wraptors Media/SEO/730941504_18409686289146462_8126761517611540665_n.jpg';

export const ARTICLE_IMAGES = {
  wraps1, wraps2, wraps3,
  ppf1, ppf2, ppf3,
  ceramic1, ceramic2, ceramic3,
  tint1,

  wraps4: wrapsUrusFront,
  wraps5: wrapsPorscheRear,
  wraps6: wrapsPorscheFront,
  wraps7: wrapsCyberPair,
  wraps8: wrapsCyberPink,
  wraps9: wrapsCyberTeal,
  wraps10: wrapsEscaladePair,
  wraps11: wrapsGhostPairA,
  wraps12: wrapsGhostPairB,
  wraps13: wrapsAventadorA,
  wraps14: wrapsAventadorB,

  ppf4: ppfMcLarenBlueA,
  ppf5: ppfMcLarenBlueB,
  ppf6: ppfMcLarenBlueC,
  ppf7: ppfRollsCarbon,
  ppf8: ppfMcLarenWhiteA,
  ppf9: ppfMcLarenWhiteB,

  ceramic4: ceramicMaybachA,
  ceramic5: ceramicMaybachB,
  ceramic6: ceramicBrabusWheel,
  ceramic7: ceramicBrabusGrille,
  ceramic8: ceramicBentleyRain,

  tint2: tintAudiRS,
  tint3: wrapsGhostPairB,
  tint4: wrapsGhostPairA,
};
