import React, { useEffect } from 'react'

// Update image imports to correct paths
import SaberServant from '../assets/Images/SaberServant.png'
import CastoriaServant from '../assets/Images/CastoriaServant.png'
import ArcueidServant from '../assets/Images/ArcueidServant.png'
import AokoServant from '../assets/Images/AokoServant.png'
import AliceServant from '../assets/Images/AliceServant.png'

import SaberDeck from '../assets/Images/SaberDeck.png'
import CastoriaDeck from '../assets/Images/CastoriaDeck.png'
import ArcueidDeck from '../assets/Images/ArcueidDeck.png'
import AokoDeck from '../assets/Images/AokoDeck.png'
import AliceDeck from '../assets/Images/AliceDeck.png'
import SuperAokoDeck from '../assets/Images/SuperAokoDeck.png'

// Add BGM imports
import SaberBGM from '../assets/BGM/saber.mp3'
import CastoriaBGM from '../assets/BGM/castoria.mp3'
import ArcueidBGM from '../assets/BGM/arcueid.mp3'
import AokoBGM from '../assets/BGM/aoko.mp3'
import AliceBGM from '../assets/BGM/alice.mp3'

// Add BGM mapping
const servantBGM = {
  2: SaberBGM,
  386: CastoriaBGM,
  351: ArcueidBGM,
  413: AokoBGM,
  415: AliceBGM,
};

const servantData = [
    {
        Name: "Saber",
        id: 2,
        japName: "アルトリア・ペンドラゴン",
        aka: ["King of Knights of the Holy Sword", "King of Knights", "Altria Pendragon", "King Arthur", "Blue Saber"],
        cost: 16,
        baseAtk: { min: 1734, max: 11221 },
        baseHp: { min: 2222, max: 15150 },
        grail100: { atk: 12283, hp: 16597 },
        grail120: { atk: 14418, hp: 19506 },
        voice: "Kawasumi Ayako",
        illustrator: "Takeuchi Takashi",
        attribute: "Earth",
        growthCurve: "Linear",
        starAbsorb: 102,
        starGen: "10%",
        npChargeAtk: "0.86%",
        npChargeDef: "3%",
        deathRate: "21%",
        alignments: ["Lawful", "Good"],
        gender: "Female",
        traits: ["Arthur", "Artoria Face", "Costume-Owning", "Dragon", "Fate/stay night Servant", "Hominidae Servant", "Humanoid", "King", "Riding", "Round Table Knight", "Servant", "Seven Knights Servant", "Weak to Enuma Elish"]
    },
    {
        Name: "Artoria Caster (Berserker)",
        id: 386,
        japName: "アルトリア・キャスター",
        aka: ["Artoria"],
        cost: 16,
        baseAtk: { min: 1875, max: 12134 },
        baseHp: { min: 1862, max: 12696 },
        grail100: { atk: 13283, hp: 13909 },
        grail120: { atk: 15591, hp: 16347 },
        voice: "Kawasumi Ayako",
        illustrator: "Takeuchi Takashi",
        attribute: "Star",
        growthCurve: "Semi S",
        starAbsorb: 10,
        starGen: "5%",
        npChargeAtk: "0.4%",
        npChargeDef: "5%",
        deathRate: "39%",
        alignments: ["Neutral", "Good"],
        gender: "Female",
        traits: ["Arthur", "Artoria Caster", "Artoria Face", "Enuma Elish Nullification", "Fae", "Humanoid", "Non-Hominidae Servant", "Round Table Knight", "Servant", "Seven Knights Servant", "Summer Mode Servant"]
    },
    {
        Name: "Archetype: EARTH",
        id: 351,
        japName: "アーキタイプ：アース; アルクェイド・ブリュンスタッド",
        aka: ["Arcueid Brunestud", "Archetype: EARTH"],
        cost: 16,
        baseAtk: { min: 1792, max: 11601 },
        baseHp: { min: 2079, max: 14175 },
        grail100: { atk: 12699, hp: 15529 },
        grail120: { atk: 14906, hp: 18258 },
        voice: "Hasegawa Ikumi",
        illustrator: "Takeuchi Takashi",
        attribute: "Star",
        growthCurve: "Reverse S",
        starAbsorb: 50,
        starGen: "15%",
        npChargeAtk: "0.45%",
        npChargeDef: "3%",
        deathRate: "0.6%",
        alignments: {
            default: ["Chaotic", "Good"],
            stage2: ["Neutral", "Good"]
        },
        gender: "Female",
        traits: ["Enuma Elish Nullification", "Humanoid", "Immune to Pigify", "Non-Hominidae Servant", "Servant"]
    },
    {
        Name: "Aozaki Aoko",
        id: 413,
        japName: "蒼崎青子",
        aka: ["Aozaki Aoko"],
        cost: 16,
        forms: {
            default: {
                baseAtk: { min: 1749, max: 11319 },
                baseHp: { min: 2090, max: 14250 },
                grail100: { atk: 12390, hp: 15611 },
                grail120: { atk: 14544, hp: 18347 },
                attribute: "Man",
                starAbsorb: 153,
                starGen: "15%",
                npChargeAtk: "0.55%",
                deathRate: "9%",
                traits: ["Bunny Servant", "Weak to Enuma Elish"]
            },
            super: {
                baseAtk: { min: 1944, max: 12584 },
                baseHp: { min: 1940, max: 13230 },
                grail100: { atk: 13775, hp: 14494 },
                grail120: { atk: 16169, hp: 17034 },
                attribute: "Star",
                starAbsorb: 147,
                starGen: "15.6%",
                npChargeAtk: "0.33%",
                deathRate: "5%",
                traits: ["Enuma Elish Nullification"]
            }
        },
        voice: "Tomatsu Haruka",
        illustrator: "Koyama Hirokazu",
        growthCurve: "S",
        npChargeDef: "3%",
        alignments: ["Lawful", "Good"],
        gender: "Female",
        commonTraits: ["Existence Outside the Domain", "Hominidae Servant", "Humanoid", "Living Human", "Servant"]
    },
    {
        Name: "Kuonji Alice",
        id: 415,
        japName: "久遠寺有珠",
        aka: ["Alice"],
        cost: 16,
        baseAtk: { min: 1645, max: 10650 },
        baseHp: { min: 2166, max: 14773 },
        grail100: { atk: 11658, hp: 16184 },
        grail120: { atk: 13684, hp: 19021 },
        voice: ["Hanazawa Kana", "Fukuen Misato"],
        illustrator: "Koyama Hirokazu",
        attribute: {
            default: "Man",
            stage3: "Earth"
        },
        growthCurve: "Semi Reverse S",
        starAbsorb: 51,
        starGen: "10.6%",
        npChargeAtk: "0.51%",
        npChargeDef: "3%",
        deathRate: "33%",
        alignments: {
            default: ["Chaotic", "Good"],
            stage3: ["Chaotic", "Evil"]
        },
        gender: "Female",
        traits: ["Hominidae Servant", "Humanoid", "Living Human", "Servant", "Seven Knights Servant", "Weak to Enuma Elish", "Stage 3: Levitating Servant"]
    }
];

const servantHitCounts = {
  2: { // Saber
    quick: 2,
    arts: 2,
    buster: 1,
    extra: 3
  },
  386: { // Castoria
    quick: 5,
    arts: 4,
    buster: 4,
    extra: 5
  },
  351: { // Arcueid
    quick: 4,
    arts: 4,
    buster: 3,
    extra: 5
  },
  413: { 
    default: {
      quick: 4,
      arts: 3,
      buster: 3,
      extra: 5
    },
    super: {
      quick: 4,
      arts: 3,
      buster: 3,
      extra: 5,
      isAoe: {
        buster: true,
        extra: true
      }
    }
  },
  415: { // Alice
    quick: 5,
    arts: 5,
    buster: 4,
    extra: 5
  }
};

const servantImages = {
  2: { servant: SaberServant, deck: SaberDeck },
  386: { servant: CastoriaServant, deck: CastoriaDeck },
  351: { servant: ArcueidServant, deck: ArcueidDeck },
  413: { 
    servant: AokoServant, 
    deck: AokoDeck,
    superDeck: SuperAokoDeck 
  },
  415: { servant: AliceServant, deck: AliceDeck },
};

function ServantDesc({ selectedServantId }) {
  const selectedServant = servantData.find(servant => servant.id === selectedServantId);

  if (!selectedServant) {
    return <div className="text-white">Servant not found</div>;
  }

  // Helper function to render stats based on form
  const renderStats = (stats) => {
    return (
      <div className="space-y-4">
        <div>
          <p><span className="text-gray-400">ATK:</span> {stats.baseAtk?.min} / {stats.baseAtk?.max}</p>
          <p><span className="text-gray-400">HP:</span> {stats.baseHp?.min} / {stats.baseHp?.max}</p>
        </div>
        {stats.grail100 && (
          <div>
            <p className="text-[#FFD700]">Level 100:</p>
            <p className="text-[#FFD700]">ATK: {stats.grail100.atk} | HP: {stats.grail100.hp}</p>
          </div>
        )}
        {stats.grail120 && (
          <div>
            <p className="text-[#FFD700]">Level 120:</p>
            <p className="text-[#FFD700]">ATK: {stats.grail120.atk} | HP: {stats.grail120.hp}</p>
          </div>
        )}
      </div>
    );
  };

  // Special handling for Aoko who has multiple forms
  const isAoko = selectedServant.id === 413;
  const isAlice = selectedServant.id === 415;

  useEffect(() => {
    // Create new audio element
    const audio = new Audio(servantBGM[selectedServantId]);
    audio.volume = 0.3; // Set volume to 30%
    audio.play();

    // Cleanup on unmount
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [selectedServantId]);

  return (
    <div className="p-4">
      <div className="bg-[#1A1A1A]/50 rounded-lg p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Description */}
          <div className="w-full md:w-3/4 text-white space-y-4">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{selectedServant.Name}</h1>
              <p className="text-2xl text-gray-400 mb-4">{selectedServant.japName}</p>
              <div className="space-y-2">
                <p><span className="text-gray-400">ID:</span> {selectedServant.id}</p>
                <p><span className="text-gray-400">Cost:</span> {selectedServant.cost}</p>
                <div>
                  <span className="text-gray-400">Also Known As:</span>
                  <ul className="list-disc ml-6 mt-1">
                    {Array.isArray(selectedServant.aka) && selectedServant.aka.map((alias, index) => (
                      <li key={index}>{alias}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {isAoko ? (
                <>
                  <div>
                    <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">Default Form</h3>
                    {renderStats(selectedServant.forms.default)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">Super Form</h3>
                    {renderStats(selectedServant.forms.super)}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-xl font-semibold border-b border-gray-600 pb-2">Base Stats</h3>
                    {renderStats(selectedServant)}
                  </div>
                </>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Profile Section */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold border-b border-gray-600 pb-2">Profile</h3>
                <p><span className="text-gray-400">Voice:</span> {Array.isArray(selectedServant.voice) ? selectedServant.voice.join(', ') : selectedServant.voice}</p>
                <p><span className="text-gray-400">Illustrator:</span> {selectedServant.illustrator}</p>
                <p><span className="text-gray-400">Gender:</span> {selectedServant.gender}</p>
                <p><span className="text-gray-400">Attribute:</span> {
                  isAlice ? 
                    `${selectedServant.attribute.default} (Stage 1-2), ${selectedServant.attribute.stage3} (Stage 3)` :
                    selectedServant.attribute
                }</p>
                <p><span className="text-gray-400">Growth:</span> {selectedServant.growthCurve}</p>
              </div>

              {/* Battle Stats Section */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold border-b border-gray-600 pb-2">Battle Stats</h3>
                {isAoko ? (
                  <>
                    <div className="mb-4">
                      <p className="text-yellow-400 font-semibold">Default Form:</p>
                      <p><span className="text-gray-400">Star Absorption:</span> {selectedServant.forms.default.starAbsorb}</p>
                      <p><span className="text-gray-400">Star Generation:</span> {selectedServant.forms.default.starGen}</p>
                      <p><span className="text-gray-400">NP Charge (ATK):</span> {selectedServant.forms.default.npChargeAtk}</p>
                    </div>
                    <div>
                      <p className="text-yellow-400 font-semibold">Super Form:</p>
                      <p><span className="text-gray-400">Star Absorption:</span> {selectedServant.forms.super.starAbsorb}</p>
                      <p><span className="text-gray-400">Star Generation:</span> {selectedServant.forms.super.starGen}</p>
                      <p><span className="text-gray-400">NP Charge (ATK):</span> {selectedServant.forms.super.npChargeAtk}</p>
                    </div>
                  </>
                ) : (
                  // Regular servant battle stats display
                  <>
                    <p><span className="text-gray-400">Star Absorption:</span> {selectedServant.starAbsorb}</p>
                    <p><span className="text-gray-400">Star Generation:</span> {selectedServant.starGen}</p>
                    <p><span className="text-gray-400">NP Charge (ATK):</span> {selectedServant.npChargeAtk}</p>
                    <p><span className="text-gray-400">NP Charge (DEF):</span> {selectedServant.npChargeDef}</p>
                    <p><span className="text-gray-400">Death Rate:</span> {selectedServant.deathRate}</p>
                  </>
                )}
              </div>

              {/* Alignments Section */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold border-b border-gray-600 pb-2">Alignments</h3>
                {isAlice ? (
                  <>
                    <p><span className="text-gray-400">Stage 1-2:</span> {selectedServant.alignments.default.join(' • ')}</p>
                    <p><span className="text-gray-400">Stage 3:</span> {selectedServant.alignments.stage3.join(' • ')}</p>
                  </>
                ) : Array.isArray(selectedServant.alignments) ? (
                  <p>{selectedServant.alignments.join(' • ')}</p>
                ) : (
                  <>
                    <p><span className="text-gray-400">Default:</span> {selectedServant.alignments.default.join(' • ')}</p>
                    {selectedServant.alignments.stage2 && (
                      <p><span className="text-gray-400">Stage 2:</span> {selectedServant.alignments.stage2.join(' • ')}</p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Traits Section - New Addition */}
            <div className="mt-6 space-y-2">
              <h3 className="text-xl font-semibold border-b border-gray-600 pb-2">Traits</h3>
              <div className="flex flex-wrap gap-2">
                {isAoko ? (
                  <>
                    <div className="mb-4 w-full">
                      <p className="text-yellow-400 font-semibold mb-2">Default Form:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedServant.forms.default.traits.map((trait, index) => (
                          <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-yellow-400 font-semibold mb-2">Super Form:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedServant.forms.super.traits.map((trait, index) => (
                          <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedServant.commonTraits && (
                      <div className="w-full mt-4">
                        <p className="text-gray-400 font-semibold mb-2">Common Traits:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedServant.commonTraits.map((trait, index) => (
                            <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  selectedServant.traits && selectedServant.traits.map((trait, index) => (
                    <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                      {trait}
                    </span>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Right side - Servant Image */}
          <div className="w-full md:w-1/4 flex justify-center">
            <img 
              src={servantImages[selectedServantId]?.servant}
              alt={selectedServant.Name}
              className="w-[200px] md:w-full max-w-[300px] h-auto rounded-lg object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            />
          </div>
        </div>

        {/* Bottom - Deck Image and Hit Counts */}
        <div className="mt-8 space-y-6">
          {isAoko ? (
            // Aoko's special layout
            <div className="space-y-8">
              {/* Default Form Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Aoko Command Deck</h3>
                <div className="flex justify-center">
                  <img 
                    src={servantImages[selectedServantId]?.deck}
                    alt="Command Deck"
                    className="w-full max-w-[600px] h-auto rounded-lg object-contain"
                  />
                </div>
                
                {/* Default Form Hit Counts */}
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Hit Counts</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-[#00ff00] font-semibold">QUICK</p>
                      <p className="text-white">{servantHitCounts[selectedServantId].default.quick} Hits</p>
                    </div>
                    <div>
                      <p className="text-[#0000ff] font-semibold">ARTS</p>
                      <p className="text-white">{servantHitCounts[selectedServantId].default.arts} Hits</p>
                    </div>
                    <div>
                      <p className="text-[#ff0000] font-semibold">BUSTER</p>
                      <p className="text-white">{servantHitCounts[selectedServantId].default.buster} Hits</p>
                    </div>
                    <div>
                      <p className="text-[#d3d3d3] font-semibold">EXTRA ATTACK</p>
                      <p className="text-white">{servantHitCounts[selectedServantId].default.extra} Hits</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Super Form Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Super Aoko Command Deck</h3>
                <div className="flex justify-center">
                  <img 
                    src={servantImages[selectedServantId]?.superDeck}
                    alt="Super Form Command Deck"
                    className="w-full max-w-[600px] h-auto rounded-lg object-contain"
                  />
                </div>

                {/* Super Form Hit Counts */}
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Hit Counts</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-[#00ff00] font-semibold">QUICK</p>
                      <p className="text-white">{servantHitCounts[selectedServantId].super.quick} Hits</p>
                    </div>
                    <div>
                      <p className="text-[#0000ff] font-semibold">ARTS</p>
                      <p className="text-white">{servantHitCounts[selectedServantId].super.arts} Hits</p>
                    </div>
                    <div>
                      <p className="text-[#ff0000] font-semibold">BUSTER</p>
                      <p className="text-white">{servantHitCounts[selectedServantId].super.buster} Hits (AoE)</p>
                    </div>
                    <div>
                      <p className="text-[#d3d3d3] font-semibold">EXTRA ATTACK</p>
                      <p className="text-white">{servantHitCounts[selectedServantId].super.extra} Hits (AoE)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Regular servant layout
            <>
              <div>
                <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Command Deck</h3>
                <div className="flex justify-center">
                  <img 
                    src={servantImages[selectedServantId]?.deck}
                    alt="Command Deck"
                    className="w-full max-w-[600px] h-auto rounded-lg object-contain"
                  />
                </div>
              </div>

              {/* Hit Counts Section */}
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Hit Counts</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[#00ff00] font-semibold">QUICK</p>
                    <p className="text-white">{servantHitCounts[selectedServantId]?.quick} Hits</p>
                  </div>
                  <div>
                    <p className="text-[#0000ff] font-semibold">ARTS</p>
                    <p className="text-white">{servantHitCounts[selectedServantId]?.arts} Hits</p>
                  </div>
                  <div>
                    <p className="text-[#ff0000] font-semibold">BUSTER</p>
                    <p className="text-white">{servantHitCounts[selectedServantId]?.buster} Hits</p>
                  </div>
                  <div>
                    <p className="text-[#d3d3d3] font-semibold">EXTRA ATTACK</p>
                    <p className="text-white">{servantHitCounts[selectedServantId]?.extra} Hits</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServantDesc
