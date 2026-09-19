import type { DiseaseDatabase } from './types'
import type { Translations } from './types'

// Keyed by the trained model's actual output classes (ml/export_tfjs/labels.json),
// covering all 38 PlantVillage classes, plus backward-compatibility aliases.
export const diseaseDatabase: DiseaseDatabase = {
  // --- Apple ---
  'Apple___Apple_scab': {
    crop: 'Apple',
    severity: 'High',
    symptoms: 'Olive-green to dull black velvety lesions on leaves and fruit, causing foliage distortion and cracked fruit',
    treatment: {
      chemical: 'Apply fungicides containing Captan, Mancozeb, or Myclobutanil early in the season',
      organic: 'Spray wettable sulfur, liquid copper, or neem oil; rake and destroy infected leaf litter',
      prevention: 'Plant scab-resistant cultivars (e.g., Liberty, Enterprise), prune canopy for rapid drying',
    },
    confidence: 92,
  },
  'Apple___Black_rot': {
    crop: 'Apple',
    severity: 'High',
    symptoms: 'Circular purple spots enlarging into "frog-eye" leaf lesions with light centers; dark, sunken decaying fruit rot',
    treatment: {
      chemical: 'Apply Captan or Thiophanate-methyl sprays from silver tip through harvest',
      organic: 'Prune out dead or infected wood 6-8 inches below visible symptoms; collect and destroy mummified fruit',
      prevention: 'Avoid tree injuries, sanitize pruning shears, maintain open tree canopy for airflow',
    },
    confidence: 91,
  },
  'Apple___Cedar_apple_rust': {
    crop: 'Apple',
    severity: 'Medium',
    symptoms: 'Bright yellow-orange spots on upper leaf surface that develop tiny black dots and tube-like sporangia on undersides',
    treatment: {
      chemical: 'Apply Myclobutanil or Mancozeb fungicide starting at pink-bud stage',
      organic: 'Apply copper soap or sulfur spray prior to rain events; remove nearby galls on juniper hosts',
      prevention: 'Remove Eastern red cedar trees within 1-2 miles if feasible; plant rust-immune varieties',
    },
    confidence: 93,
  },
  'Apple___healthy': {
    crop: 'Apple',
    severity: 'None',
    symptoms: 'Vigorous, dark green foliage with smooth leaves and no signs of fungal or bacterial spotting',
    treatment: {
      chemical: 'No treatment needed',
      organic: 'Maintain routine watering, balanced organic fertilization, and seasonal pruning',
      prevention: 'Continue proactive orchard monitoring and integrated pest management',
    },
    confidence: 98,
  },

  // --- Blueberry ---
  'Blueberry___healthy': {
    crop: 'Blueberry',
    severity: 'None',
    symptoms: 'Healthy foliage with vibrant green leaves, vigorous shoot elongation, and no necrotic lesions',
    treatment: {
      chemical: 'No treatment needed',
      organic: 'Maintain acidic soil pH (4.5–5.2) with pine bark mulch and consistent irrigation',
      prevention: 'Ensure good root drainage and monitor for gall wasps or mummy berry signs',
    },
    confidence: 98,
  },

  // --- Cherry ---
  'Cherry_(including_sour)___Powdery_mildew': {
    crop: 'Cherry',
    severity: 'Medium',
    symptoms: 'White powdery fungal mycelium patches on young leaves and terminal shoots, leading to curling and leaf distortion',
    treatment: {
      chemical: 'Apply Myclobutanil, Quinoxyfen, or wettable sulfur sprays at shuck fall',
      organic: 'Apply potassium bicarbonate, horticultural oil, or neem oil at first sign of powder',
      prevention: 'Avoid excess nitrogen fertilization that promotes lush succulent growth; prune canopy for airflow',
    },
    confidence: 90,
  },
  'Cherry_(including_sour)___healthy': {
    crop: 'Cherry',
    severity: 'None',
    symptoms: 'Glossy green leaves with uniform coloration and no fungal patches or necrotic spots',
    treatment: {
      chemical: 'No treatment needed',
      organic: 'Continue regular irrigation and organic compost mulch around drip line',
      prevention: 'Monitor during humid spring conditions for early foliar irregularities',
    },
    confidence: 98,
  },

  // --- Corn (Maize) ---
  'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': {
    crop: 'Corn (Maize)',
    severity: 'Medium',
    symptoms: 'Small tan spots expanding into rectangular, vein-delimited lesions with sharp parallel margins',
    treatment: {
      chemical: 'Apply strobilurin or triazole fungicides (e.g., Pyraclostrobin, Azoxystrobin) around tasseling stage',
      organic: 'Apply compost teas or biofungicides; incorporate crop residues into soil',
      prevention: 'Practice 2-year crop rotation away from corn; plant resistant hybrid seeds',
    },
    confidence: 89,
  },
  'Corn_(maize)___Common_rust_': {
    crop: 'Corn (Maize)',
    severity: 'Medium',
    symptoms: 'Small, circular to elongate cinnamon-brown powdery pustules on both upper and lower leaf surfaces',
    treatment: {
      chemical: 'Apply triazole or strobilurin fungicides if rust pustules appear before silking stage',
      organic: 'Apply wettable sulfur or Bacillus subtilis biofungicides; remove severely affected leaves',
      prevention: 'Select resistant hybrid varieties and plant early in the season to evade peak spore arrivals',
    },
    confidence: 92,
  },
  'Corn_(maize)___Northern_Leaf_Blight': {
    crop: 'Corn (Maize)',
    severity: 'High',
    symptoms: 'Long, elliptical, cigar-shaped grayish-green to tan lesions (1-6 inches long) that spread across foliage',
    treatment: {
      chemical: 'Apply Pyraclostrobin or Propiconazole foliar fungicides if lesions appear early in canopy development',
      organic: 'Apply copper fungicides; ensure deep tillage to bury infected previous-crop debris',
      prevention: 'Use resistant hybrid corn seed; ensure 1-2 year rotation with non-host crops like soybeans',
    },
    confidence: 91,
  },
  'Corn_(maize)___healthy': {
    crop: 'Corn (Maize)',
    severity: 'None',
    symptoms: 'Robust green maize foliage, clean broad leaves without pustules, stripes, or blight lesions',
    treatment: {
      chemical: 'No treatment needed',
      organic: 'Maintain balanced nitrogen feeding and moisture during tasseling and grain fill',
      prevention: 'Maintain proper plant density and standard crop scouting',
    },
    confidence: 98,
  },

  // --- Grape ---
  'Grape___Black_rot': {
    crop: 'Grape',
    severity: 'High',
    symptoms: 'Circular reddish-brown leaf lesions with dark margins and black pycnidia specks; shriveled, mummified black berries',
    treatment: {
      chemical: 'Apply Mancozeb, Captan, or Ziram from early shoot growth through post-bloom',
      organic: 'Apply copper hydroxide or Bordeaux mixture; prune out and burn infected canes and berry mummies',
      prevention: 'Train vines on trellis to maximize sun exposure and rapid leaf drying',
    },
    confidence: 92,
  },
  'Grape___Esca_(Black_Measles)': {
    crop: 'Grape',
    severity: 'High',
    symptoms: '"Tiger-stripe" pattern of yellow and brown interveinal necrosis on leaves; dark spotting on berries; wood decay',
    treatment: {
      chemical: 'Treat large pruning wounds with fungicides or paint sealant to prevent fungal colonization',
      organic: 'Apply Trichoderma-based biofungicides to pruning cuts; remove infected vine cordons',
      prevention: 'Prune vines during dry periods late in the dormant season; avoid large flush pruning cuts',
    },
    confidence: 88,
  },
  'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': {
    crop: 'Grape',
    severity: 'Medium',
    symptoms: 'Irregular dark reddish-brown to black spots on leaves, coalescing and causing premature defoliation',
    treatment: {
      chemical: 'Apply copper oxychloride, Mancozeb, or Chlorothalonil sprays',
      organic: 'Apply neem oil formulations or copper soap; rake and compost or bury fallen leaves',
      prevention: 'Thin canopy leaves around cluster zones to enhance airflow and sunlight penetration',
    },
    confidence: 89,
  },
  'Grape___healthy': {
    crop: 'Grape',
    severity: 'None',
    symptoms: 'Lush, deep green palmate leaves with no necrotic lesions, mildew fuzz, or mummified berries',
    treatment: {
      chemical: 'No treatment needed',
      organic: 'Maintain trellis balance, clean ground cover, and moderate organic feeding',
      prevention: 'Maintain routine canopy management and pest scouting',
    },
    confidence: 98,
  },

  // --- Orange (Citrus) ---
  'Orange___Haunglongbing_(Citrus_greening)': {
    crop: 'Orange (Citrus)',
    severity: 'High',
    symptoms: 'Asymmetrical blotchy yellow mottling on leaves, yellow shoots, hard misshapen fruit with bitter taste and aborted seeds',
    treatment: {
      chemical: 'Control Asian citrus psyllid vectors using systemic neonicotinoid or pyrethroid treatments',
      organic: 'Release parasitic wasps (Tamarixia radiata), spray horticultural mineral oils to deter psyllid feeding',
      prevention: 'Plant only certified disease-free nursery stock, immediately remove and destroy infected trees',
    },
    confidence: 94,
  },

  // --- Peach ---
  'Peach___Bacterial_spot': {
    crop: 'Peach',
    severity: 'High',
    symptoms: 'Small water-soaked angular spots on leaves turning dark reddish-purple and dropping out to create a "shot-hole" effect',
    treatment: {
      chemical: 'Apply low-rate copper bactericides or oxytetracycline sprays starting at shuck split',
      organic: 'Apply copper octanoate at dormant stage; avoid high-nitrogen fertilizers that create tender tissue',
      prevention: 'Select resistant peach cultivars (e.g., Bounty, Candor); plant windbreaks to reduce sandy abrasion',
    },
    confidence: 91,
  },
  'Peach___healthy': {
    crop: 'Peach',
    severity: 'None',
    symptoms: 'Smooth, lanceolate green leaves without shot-holes, leaf curl, or cankerous spots',
    treatment: {
      chemical: 'No treatment needed',
      organic: 'Continue regular irrigation, mulch canopy zone, and annual dormant care',
      prevention: 'Monitor for aphids, borers, and seasonal fungal pressures',
    },
    confidence: 98,
  },

  // --- Bell Pepper ---
  'Pepper,_bell___Bacterial_spot': {
    crop: 'Bell Pepper',
    severity: 'High',
    symptoms: 'Small, dark, water-soaked spots on leaves and fruit that enlarge and turn brown with yellow halos; defoliation',
    treatment: {
      chemical: 'Apply copper-based bactericides combined with Mancozeb every 7-10 days in wet conditions',
      organic: 'Remove and destroy infected plants; apply copper soap sprays or Bacillus subtilis biofungicide',
      prevention: 'Use certified disease-free seed, avoid overhead irrigation, rotate away from solanaceous crops for 2-3 years',
    },
    confidence: 93,
  },
  'Pepper,_bell___healthy': {
    crop: 'Bell Pepper',
    severity: 'None',
    symptoms: 'Healthy, deep green glossy leaves with sturdy stems and no lesions or chlorosis',
    treatment: {
      chemical: 'No treatment needed',
      organic: 'Continue balanced fertilization and drip irrigation',
      prevention: 'Maintain good agricultural hygiene and mulch soil to retain moisture',
    },
    confidence: 98,
  },
  // Alias for backward-compatibility
  'Pepper__bell___Bacterial_spot': {
    crop: 'Bell Pepper',
    severity: 'High',
    symptoms: 'Small, dark, water-soaked spots on leaves and fruit that enlarge and turn brown with yellow halos',
    treatment: {
      chemical: 'Apply copper-based bactericides combined with mancozeb every 7-10 days',
      organic: 'Remove and destroy infected plant debris, apply copper soap sprays',
      prevention: 'Use disease-free seed, avoid overhead watering, rotate crops for 2-3 years',
    },
    confidence: 93,
  },
  'Pepper__bell___healthy': {
    crop: 'Bell Pepper',
    severity: 'None',
    symptoms: 'No visible disease symptoms detected',
    treatment: {
      chemical: 'No treatment needed',
      organic: 'Continue regular care and monitoring',
      prevention: 'Maintain good agricultural practices',
    },
    confidence: 98,
  },

  // --- Potato ---
  'Potato___Early_blight': {
    crop: 'Potato',
    severity: 'Medium',
    symptoms: 'Dark brown circular lesions with concentric "target-board" rings on older lower leaves, surrounded by yellow halos',
    treatment: {
      chemical: 'Apply Azoxystrobin, Chlorothalonil, or Mancozeb fungicide starting at first sign',
      organic: 'Remove infected lower foliage, spray cold-pressed neem oil or copper soap, ensure good soil drainage',
      prevention: '3-year crop rotation, avoid moisture stress, mulch to prevent soil splash onto foliage',
    },
    confidence: 92,
  },
  'Potato___Late_blight': {
    crop: 'Potato',
    severity: 'High',
    symptoms: 'Dark water-soaked lesions that rapidly expand across leaves and stems, accompanied by white fungal mold underneath in humid air',
    treatment: {
      chemical: 'Apply Mancozeb, Cymoxanil, or Chlorothalonil fungicide immediately every 5-7 days',
      organic: 'Remove and burn infected foliage immediately; spray fixed copper fungicides; hill tubers deeply',
      prevention: 'Plant certified disease-free seed tubers, avoid overhead sprinklers, destroy volunteer potato plants',
    },
    confidence: 95,
  },
  'Potato___healthy': {
    crop: 'Potato',
    severity: 'None',
    symptoms: 'Vigorous composite green potato foliage with crisp leaves and no necrotic spotting or fungal blights',
    treatment: {
      chemical: 'No treatment needed',
      organic: 'Continue adequate hilling and organic compost management',
      prevention: 'Maintain crop rotation and monitor during cool, rainy periods',
    },
    confidence: 98,
  },

  // --- Raspberry ---
  'Raspberry___healthy': {
    crop: 'Raspberry',
    severity: 'None',
    symptoms: 'Healthy, bright green trifoliate foliage on vigorous canes without cane blights, rust, or viral mottling',
    treatment: {
      chemical: 'No treatment needed',
      organic: 'Ensure well-drained loamy soil, mulch canes, and prune out old floricanes post-harvest',
      prevention: 'Maintain adequate row spacing for ventilation and monitor for spider mites',
    },
    confidence: 98,
  },

  // --- Soybean ---
  'Soybean___healthy': {
    crop: 'Soybean',
    severity: 'None',
    symptoms: 'Uniform, deep green trifoliate soybean leaves with no frog-eye spots, rust pustules, or mosaic chlorosis',
    treatment: {
      chemical: 'No treatment needed',
      organic: 'Maintain rhizobium nodulation health and proper weed management',
      prevention: 'Rotate fields with corn or small grains; scout for defoliating pests',
    },
    confidence: 98,
  },

  // --- Squash ---
  'Squash___Powdery_mildew': {
    crop: 'Squash',
    severity: 'Medium',
    symptoms: 'White powdery fungal spots rapidly spreading over upper and lower leaf surfaces, causing leaves to yellow and shrivel',
    treatment: {
      chemical: 'Apply Myclobutanil, Chlorothalonil, or Triflumizole fungicide at first spot detection',
      organic: 'Apply potassium bicarbonate, neem oil spray, or a 10% milk-to-water foliar spray solution',
      prevention: 'Plant resistant squash varieties; space plants widely for airflow; avoid shade and overhead watering',
    },
    confidence: 93,
  },

  // --- Strawberry ---
  'Strawberry___Leaf_scorch': {
    crop: 'Strawberry',
    severity: 'Medium',
    symptoms: 'Small, irregular dark purple spots on leaves that coalesce, causing leaf margins to curl upward and look scorched/burned',
    treatment: {
      chemical: 'Apply Captan, Thiophanate-methyl, or Pyraclostrobin fungicides during flowering and runner development',
      organic: 'Apply copper sulfate/soap sprays; rake and destroy infected leaves following harvest renovation',
      prevention: 'Plant certified disease-free runner crowns; avoid overhead sprinkler systems; ensure good soil drainage',
    },
    confidence: 91,
  },
  'Strawberry___healthy': {
    crop: 'Strawberry',
    severity: 'None',
    symptoms: 'Vibrant, saw-toothed green strawberry foliage with robust crown growth and no purple blotches',
    treatment: {
      chemical: 'No treatment needed',
      organic: 'Maintain clean straw mulching beneath fruit and steady drip watering',
      prevention: 'Renovate beds every 2-3 years to reduce pathogen build-up',
    },
    confidence: 98,
  },

  // --- Tomato ---
  'Tomato___Bacterial_spot': {
    crop: 'Tomato',
    severity: 'High',
    symptoms: 'Small, water-soaked brown spots on leaves with yellow haloes, leading to severe leaf drop and spotted fruit lesions',
    treatment: {
      chemical: 'Apply copper-based bactericides combined with Mancozeb spray every 7-10 days',
      organic: 'Remove infected plants promptly; spray copper octanoate or Bacillus amyloliquefaciens',
      prevention: 'Use certified disease-free seed, avoid handling wet plants, rotate away from solanaceous crops for 3 years',
    },
    confidence: 92,
  },
  'Tomato___Early_blight': {
    crop: 'Tomato',
    severity: 'Medium',
    symptoms: 'Dark brown concentric rings ("target spots") on older lower leaves, with yellowing and premature leaf defoliation',
    treatment: {
      chemical: 'Apply Chlorothalonil, Azoxystrobin, or Mancozeb fungicide spray at first symptom',
      organic: 'Prune away infected lower foliage; spray neem oil or copper soap; mulch ground heavily',
      prevention: 'Stake plants for airflow, practice 3-year crop rotation, water solely at base of plant',
    },
    confidence: 92,
  },
  'Tomato___Late_blight': {
    crop: 'Tomato',
    severity: 'High',
    symptoms: 'Large, dark, water-soaked lesions on leaves and stems with fuzzy white fungal spore growth underneath in damp weather',
    treatment: {
      chemical: 'Apply Mancozeb, Chlorothalonil, or Dimethomorph fungicide immediately at first warning',
      organic: 'Destroy severely infected vines immediately; apply preventive copper soap sprays before rain events',
      prevention: 'Plant blight-resistant tomato varieties (e.g., Defiant, Mountain Merit); avoid overhead irrigation',
    },
    confidence: 95,
  },
  'Tomato___Leaf_Mold': {
    crop: 'Tomato',
    severity: 'Medium',
    symptoms: 'Pale green or yellowish spots on upper leaf surfaces with velvety olive-green to brown fungal growth underneath',
    treatment: {
      chemical: 'Apply Chlorothalonil or copper-based fungicides when greenhouse/field humidity is high',
      organic: 'Increase greenhouse ventilation, thin inner leaves to reduce humidity, apply copper soap sprays',
      prevention: 'Maintain relative humidity below 85%; plant resistant hybrid varieties; avoid wetting leaves',
    },
    confidence: 90,
  },
  'Tomato___Septoria_leaf_spot': {
    crop: 'Tomato',
    severity: 'Medium',
    symptoms: 'Numerous small circular spots with dark brown margins and gray/tan centers dotted with tiny black pycnidia',
    treatment: {
      chemical: 'Apply Chlorothalonil or Mancozeb fungicides every 7-10 days during warm, humid conditions',
      organic: 'Prune off lower infected leaves; apply biological fungicides like Serenade (Bacillus subtilis)',
      prevention: 'Mulch beneath tomato plants to prevent soil splash; rotate crops; sanitize cages and stakes',
    },
    confidence: 91,
  },
  'Tomato___Spider_mites Two-spotted_spider_mite': {
    crop: 'Tomato',
    severity: 'Medium',
    symptoms: 'Fine yellow-white stippling on leaf surfaces, bronzing leaves, and delicate silk webbing on leaf undersides',
    treatment: {
      chemical: 'Apply miticides such as Abamectin, Bifenazate, or Spiromesifen; alternate chemical classes',
      organic: 'Spray insecticidal soap, neem oil, or sulfur dust; release predatory mites (Phytoseiulus persimilis)',
      prevention: 'Maintain adequate plant hydration during hot, dry spells; spray undersides of leaves with water',
    },
    confidence: 89,
  },
  'Tomato___Target_Spot': {
    crop: 'Tomato',
    severity: 'Medium',
    symptoms: 'Small, pinpoint brown spots on leaves expanding into larger lesions with definite concentric circles',
    treatment: {
      chemical: 'Apply Azoxystrobin, Pyraclostrobin, or Chlorothalonil fungicides',
      organic: 'Prune lower leaves to improve canopy air movement; apply copper fungicides',
      prevention: 'Avoid overhead watering; maintain generous row spacing; destroy post-harvest tomato debris',
    },
    confidence: 90,
  },
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus': {
    crop: 'Tomato',
    severity: 'High',
    symptoms: 'Severe upward leaf cupping, chlorotic leaf margins, stunted bushy plant growth, and heavy blossom drop; spread by whiteflies',
    treatment: {
      chemical: 'Control whitefly vector populations using imidacloprid, acetamiprid, or dinotefuran',
      organic: 'Deploy yellow sticky traps; use reflective silver mulch; spray insecticidal soaps for whitefly suppression',
      prevention: 'Plant TYLCV-resistant tomato cultivars; use fine insect netting; promptly rogue out infected plants',
    },
    confidence: 94,
  },
  'Tomato___Tomato_mosaic_virus': {
    crop: 'Tomato',
    severity: 'High',
    symptoms: 'Mottled alternating light and dark green mosaic patterns on leaves, fern-like distorted leaf growth, and internal browning of fruit',
    treatment: {
      chemical: 'No chemical treatment exists; infected plants must be carefully removed and destroyed',
      organic: 'Sanitize tools in milk or trisodium phosphate solution; wash hands before handling plants',
      prevention: 'Use certified virus-free seed; plant resistant cultivars (marked with "T" or "TMV"); avoid smoking near plants',
    },
    confidence: 93,
  },
  'Tomato___healthy': {
    crop: 'Tomato',
    severity: 'None',
    symptoms: 'Healthy, deep green compound leaves, vigorous terminal growth, and no signs of bacterial or fungal lesions',
    treatment: {
      chemical: 'No treatment needed',
      organic: 'Maintain consistent deep watering and organic calcium-rich feeding to prevent blossom end rot',
      prevention: 'Continue routine plant staking, sucker pruning, and proactive scouting',
    },
    confidence: 98,
  },

  // Backward-compatibility aliases (for previous 16-class naming format)
  'Tomato_Bacterial_spot': {
    crop: 'Tomato',
    severity: 'High',
    symptoms: 'Small, dark, greasy-looking spots on leaves, stems, and fruit',
    treatment: {
      chemical: 'Apply copper-based bactericides, avoid excessive nitrogen fertilization',
      organic: 'Remove infected plants, use copper soap sprays, improve air circulation',
      prevention: 'Use certified disease-free seed, avoid working with wet plants, rotate crops',
    },
    confidence: 90,
  },
  'Tomato_Early_blight': {
    crop: 'Tomato',
    severity: 'Medium',
    symptoms: 'Concentric "target-spot" rings on older leaves, yellowing and leaf drop',
    treatment: {
      chemical: 'Apply Chlorothalonil or Azoxystrobin fungicide',
      organic: 'Remove infected lower leaves, apply neem oil, mulch to prevent soil splash',
      prevention: 'Crop rotation, stake plants for airflow, avoid overhead watering',
    },
    confidence: 90,
  },
  'Tomato_Late_blight': {
    crop: 'Tomato',
    severity: 'High',
    symptoms: 'Dark brown spots on leaves, white fungal growth on undersides',
    treatment: {
      chemical: 'Apply Mancozeb or Chlorothalonil fungicide every 7-10 days',
      organic: 'Remove infected leaves, apply copper-based fungicides, ensure proper air circulation',
      prevention: 'Avoid overhead irrigation, plant resistant varieties, rotate crops',
    },
    confidence: 94,
  },
  'Tomato_Leaf_Mold': {
    crop: 'Tomato',
    severity: 'Medium',
    symptoms: 'Olive-green to gray fuzzy growth on underside of leaves',
    treatment: {
      chemical: 'Use chlorothalonil or copper-based fungicides',
      organic: 'Improve air circulation, remove infected leaves',
      prevention: 'Avoid overhead watering, resistant varieties',
    },
    confidence: 88,
  },
  'Tomato_Septoria_leaf_spot': {
    crop: 'Tomato',
    severity: 'Medium',
    symptoms: 'Small circular spots with dark borders and gray centers, mainly on lower leaves',
    treatment: {
      chemical: 'Apply chlorothalonil or mancozeb fungicide',
      organic: 'Remove and destroy infected leaves, mulch around base of plant',
      prevention: 'Rotate crops, avoid overhead irrigation, space plants for airflow',
    },
    confidence: 88,
  },
  'Tomato_Spider_mites_Two_spotted_spider_mite': {
    crop: 'Tomato',
    severity: 'Medium',
    symptoms: 'Fine yellow stippling on leaves, fine webbing on undersides in heavy infestations',
    treatment: {
      chemical: 'Apply miticides such as abamectin, rotate active ingredients to avoid resistance',
      organic: 'Spray insecticidal soap or neem oil, introduce predatory mites',
      prevention: 'Avoid drought stress, keep plants well watered, monitor regularly',
    },
    confidence: 86,
  },
  'Tomato__Target_Spot': {
    crop: 'Tomato',
    severity: 'Medium',
    symptoms: 'Brown lesions with concentric rings on leaves, stems, and fruit',
    treatment: {
      chemical: 'Apply chlorothalonil or azoxystrobin fungicide',
      organic: 'Remove infected debris, improve air circulation',
      prevention: 'Crop rotation, avoid leaf wetness, resistant varieties where available',
    },
    confidence: 88,
  },
  'Tomato__Tomato_YellowLeaf__Curl_Virus': {
    crop: 'Tomato',
    severity: 'High',
    symptoms: 'Upward curling and yellowing of leaves, stunted growth, spread by whiteflies',
    treatment: {
      chemical: 'Control whitefly vectors with insecticidal sprays',
      organic: 'Use reflective mulches and yellow sticky traps to reduce whiteflies',
      prevention: 'Plant resistant varieties, remove infected plants promptly, control whitefly populations',
    },
    confidence: 92,
  },
  'Tomato__Tomato_mosaic_virus': {
    crop: 'Tomato',
    severity: 'High',
    symptoms: 'Mottled light and dark green pattern on leaves, distorted leaf growth, stunted plants',
    treatment: {
      chemical: 'No chemical cure - remove and destroy infected plants',
      organic: 'Disinfect tools between plants, wash hands after handling tobacco products',
      prevention: 'Use resistant varieties, certified virus-free seed, control aphid vectors',
    },
    confidence: 91,
  },
  'Tomato_healthy': {
    crop: 'Tomato',
    severity: 'None',
    symptoms: 'No visible disease symptoms detected',
    treatment: {
      chemical: 'No treatment needed',
      organic: 'Continue regular care and monitoring',
      prevention: 'Maintain good agricultural practices',
    },
    confidence: 98,
  },
}

export const translations: Translations = {
  en: {
    title: 'AI Crop Disease Detection',
    subtitle: 'Upload or capture leaf image for instant diagnosis',
    upload: 'Upload Image',
    camera: 'Use Camera',
    analyzing: 'Analyzing...',
    disease: 'Disease Detected',
    crop: 'Crop',
    severity: 'Severity',
    confidence: 'Confidence',
    symptoms: 'Symptoms',
    treatment: 'Treatment',
    chemical: 'Chemical',
    organic: 'Organic',
    prevention: 'Prevention',
    newScan: 'New Scan',
    selectLanguage: 'Language',
  },
  hi: {
    title: 'एआई फसल रोग पहचान',
    subtitle: 'तुरंत निदान के लिए पत्ती की तस्वीर अपलोड करें',
    upload: 'फोटो अपलोड करें',
    camera: 'कैमरा उपयोग करें',
    analyzing: 'विश्लेषण हो रहा है...',
    disease: 'रोग की पहचान',
    crop: 'फसल',
    severity: 'गंभीरता',
    confidence: 'विश्वास स्तर',
    symptoms: 'लक्षण',
    treatment: 'उपचार',
    chemical: 'रासायनिक',
    organic: 'जैविक',
    prevention: 'रोकथाम',
    newScan: 'नई जांच',
    selectLanguage: 'भाषा',
  },
  ta: {
    title: 'AI பயிர் நோய் கண்டறிதல்',
    subtitle: 'உடனடி நோய்க்கண்டறிதலுக்கு இலை படத்தை பதிவேற்றவும்',
    upload: 'படத்தை பதிவேற்று',
    camera: 'கேமராவைப் பயன்படுத்து',
    analyzing: 'பகுப்பாய்வு செய்கிறது...',
    disease: 'நோய் கண்டறியப்பட்டது',
    crop: 'பயிர்',
    severity: 'தீவிரம்',
    confidence: 'நம்பிக்கை நிலை',
    symptoms: 'அறிகுறிகள்',
    treatment: 'சிகிச்சை',
    chemical: 'இரசாயன',
    organic: 'இயற்கை',
    prevention: 'தடுப்பு',
    newScan: 'புதிய ஸ்கேன்',
    selectLanguage: 'மொழி',
  },
}
