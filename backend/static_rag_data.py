
# Static RAG Data for Fallback/Demo Mode
# This file contains pre-canned responses for when the AI API is unavailable.

STATIC_KNOWLEDGE_BASE = {
    "1": {  # Amazon Reforestation Alpha
        "questions": [
            {
                "keywords": ["survival", "rate", "sapling"],
                "question": "What is the sapling survival rate?",
                "answer": "Based on the Monitoring Report Q1 2024, the survival rate of the 50,000 planted native saplings is 92%, which exceeds the baseline of 85%."
            },
            {
                "keywords": ["jaguar", "wildlife", "animal", "species"],
                "question": "What wildlife species have been observed?",
                "answer": "The project reports a return of key species. Specifically, Jaguar (Panthera onca) tracks were sighted in Sector 4, and a Harpy Eagle nesting site was confirmed near the river."
            },
            {
                "keywords": ["job", "employment", "work", "community"],
                "question": "How many jobs did the project create?",
                "answer": "The project has created 120 full-time jobs for local residents in nursery management, planting, and guarding. 40% of the workforce are women."
            },
            {
                "keywords": ["carbon", "sequestration", "offset"],
                "question": "How much carbon was sequestered?",
                "answer": "According to the biomass growth equations in the Q1 2024 report, the project sequestered 25,000 tCO2e this quarter."
            },
            {
                "keywords": ["methodology", "vcs", "standard"],
                "question": "What VCS methodology is used?",
                "answer": "This project applies the VCS Methodology VM0007: REDD+ Methodology Framework (REDD+ MF) to restore illegal pasture land."
            }
        ]
    },
    "2": {  # Solar Farm Alpha
        "questions": [
            {
                "keywords": ["capacity", "power", "mw"],
                "question": "What is the capacity of the solar farm?",
                "answer": "The Solar Farm Alpha has a capacity of 50 MW, utilizing 150,000 monocrystalline silicon PV modules."
            },
            {
                "keywords": ["water", "cleaning", "dry"],
                "question": "How does the project minimize water usage?",
                "answer": "The project uses robotic dry-cleaning technology for the solar panels to minimize water consumption in the arid Gujarat region."
            },
            {
                "keywords": ["grid", "stability", "battery"],
                "question": "Does the project support grid stability?",
                "answer": "Yes, the plant includes a 10MWh battery storage pilot to assist with peak load leveling and grid stability."
            },
            {
                "keywords": ["generation", "mwh", "verify"],
                "question": "What was the net generation in 2023?",
                "answer": "The Verification Report 2023 confirms a net generation of 85,000 MWh, resulting in 78,200 tCO2e of emission reductions."
            },
            {
                "keywords": ["community", "csr", "health"],
                "question": "What community initiatives are in place?",
                "answer": "CSR initiatives include a mobile healthcare clinic visiting 5 villages weekly and the installation of off-grid solar streetlights in 3 hamlets."
            }
        ]
    },
    "3": {  # Clean Water Initiative
        "questions": [
            {
                "keywords": ["health", "diarrhea", "illness"],
                "question": "How has health improved?",
                "answer": "The Health Outcomes Report 2023 indicates that incidents of waterborne illness (diarrhea) dropped by 65% in participating households."
            },
            {
                "keywords": ["usage", "rate", "filter"],
                "question": "What is the usage rate of the filters?",
                "answer": "Spot checks confirm a 94% daily usage rate for the filters one year after distribution, with 98% of filters remaining functional."
            },
            {
                "keywords": ["wood", "fuel", "firewood"],
                "question": "How much firewood is saved?",
                "answer": "On average, each household saves 2.5 kg of firewood per day by using the gravity-fed water filters instead of boiling water."
            },
            {
                "keywords": ["location", "area", "kenya"],
                "question": "Where is the project located?",
                "answer": "The project targets rural communities in Kakamega County, Kenya."
            },
            {
                "keywords": ["technology", "lifestraw"],
                "question": "What technology is used?",
                "answer": "The project distributes LifeStraw Family 2.0 gravity-fed water filters to displace thermal energy consumption."
            }
        ]
    },
    "4": {  # Wind Power Expansion
        "questions": [
            {
                "keywords": ["bird", "avian", "mortality"],
                "question": "What is the impact on birds?",
                "answer": "Mortality rates are 0.5 birds/MW/year, which is significantly below the regional average. Avian radar detection is used to shut down turbines during migration."
            },
            {
                "keywords": ["turbine", "model", "vestas"],
                "question": "What turbines are used?",
                "answer": "The expansion adds 40 new Vestas V90-3.0 MW turbines with a hub height of 80 meters."
            },
            {
                "keywords": ["noise", "sound", "db"],
                "question": "Is the noise level compliant?",
                "answer": "Yes, acoustic monitoring confirms noise levels at the nearest residence (1.2 km away) do not exceed 40 dB(A) at night, complying with WHO guidelines."
            },
            {
                "keywords": ["capacity", "expansion", "total"],
                "question": "What is the total capacity?",
                "answer": "The project adds 120 MW of capacity to the existing wind farm, feeding directly into the ERCOT grid."
            },
            {
                "keywords": ["emission", "displaced", "tco2"],
                "question": "How many emissions were displaced?",
                "answer": "In 2023, the project displaced 150,000 tCO2e, verified against the net generation of 350,000 MWh."
            }
        ]
    },
    "5": {  # Mangrove Restoration
        "questions": [
            {
                "keywords": ["income", "livelihood", "crab"],
                "question": "How has local income changed?",
                "answer": "Participating families reported a 30% increase in monthly income due to silvofishery (crab farming) integration."
            },
            {
                "keywords": ["carbon", "soil", "density"],
                "question": "How much carbon is in the soil?",
                "answer": "Soil sampling shows average soil carbon density increased from 150 tC/ha (degraded) to 320 tC/ha (restored) over the last 5 years."
            },
            {
                "keywords": ["area", "size", "hectare"],
                "question": "How large is the project area?",
                "answer": "The project covers 2,000 hectares of restored mangrove ecosystems in North Sumatra, Indonesia."
            },
            {
                "keywords": ["satellite", "sentinel", "illegal"],
                "question": "Is there any illegal logging?",
                "answer": "Sentinel-2 satellite analysis for Q2 2024 detected no illegal logging alerts within the project boundary."
            },
            {
                "keywords": ["women", "cooperative"],
                "question": "Are there programs for women?",
                "answer": "Yes, a Women's Cooperative was established to process mangrove fruit into syrup and chips, creating additional income streams."
            }
        ]
    }
}
