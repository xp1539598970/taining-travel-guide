const gameData = {
    characters: [
        { id: 'char1', name: '可爱女孩', color: '#FFE4E1', hairColor: '#FF6B9D' },
        { id: 'char2', name: '优雅淑女', color: '#F5DEB3', hairColor: '#1a1a1a' },
        { id: 'char3', name: '甜美少女', color: '#FFEFD5', hairColor: '#FFD700' },
        { id: 'char4', name: '俏皮萝莉', color: '#FFE4E1', hairColor: '#9932CC' },
        { id: 'char5', name: '温柔女神', color: '#F0E68C', hairColor: '#2F4F4F' },
        { id: 'char6', name: '元气少女', color: '#FFE4E1', hairColor: '#FF8C00' }
    ],
    clothes: [
        { id: 'clothes1', name: '粉色连衣裙', color: '#FF69B4' },
        { id: 'clothes2', name: '蓝色礼服', color: '#4169E1' },
        { id: 'clothes3', name: '白色衬衫', color: '#FFF' },
        { id: 'clothes4', name: '红色卫衣', color: '#DC143C' },
        { id: 'clothes5', name: '紫色长裙', color: '#9932CC' },
        { id: 'clothes6', name: '黄色毛衣', color: '#FFD700' }
    ],
    scenes: [
        { id: 'scene1', name: '海滩', bg: 'linear-gradient(180deg, #87CEEB 0%, #00CED1 50%, #FFE4B5 100%)' },
        { id: 'scene2', name: '花园', bg: 'linear-gradient(180deg, #98FB98 0%, #228B22 50%, #FFB6C1 100%)' },
        { id: 'scene3', name: '城堡', bg: 'linear-gradient(180deg, #87CEEB 0%, #DA70D6 50%, #FFD700 100%)' },
        { id: 'scene4', name: '森林', bg: 'linear-gradient(180deg, #228B22 0%, #006400 50%, #90EE90 100%)' },
        { id: 'scene5', name: '城市', bg: 'linear-gradient(180deg, #1a1a1a 0%, #444 50%, #FF4500 100%)' },
        { id: 'scene6', name: '雪山', bg: 'linear-gradient(180deg, #87CEEB 0%, #FFF 50%, #E0E0E0 100%)' }
    ]
};

class DressUpGame {
    constructor() {
        this.selectedChar = null;
        this.selectedClothes = null;
        this.selectedScene = null;
        this.savedOutfits = JSON.parse(localStorage.getItem('dressup-outfits') || '[]');
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderCharacters();
    }

    bindEvents() {
        document.getElementById('saveBtn').addEventListener('click', () => this.saveOutfit());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportData());
    }

    showTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        document.getElementById('panelContent').innerHTML = '';
        document.getElementById('panelTitle').textContent = {
            character: '选择角色',
            clothes: '选择服装',
            scene: '选择场景',
            gallery: '我的作品'
        }[tabName];

        if (tabName === 'character') this.renderCharacters();
        else if (tabName === 'clothes') this.renderClothes();
        else if (tabName === 'scene') this.renderScenes();
        else if (tabName === 'gallery') this.renderGallery();
    }

    renderCharacters() {
        const content = document.getElementById('panelContent');
        content.style.gridTemplateColumns = 'repeat(3, 1fr)';
        
        gameData.characters.forEach(char => {
            const card = this.createCard(char, 'character');
            card.innerHTML = `
                <div style="height: 70px; display: flex; align-items: center; justify-content: center;">
                    <svg width="60" height="60" viewBox="0 0 60 80">
                        <circle cx="30" cy="25" r="18" fill="${char.color}"/>
                        <circle cx="24" cy="22" r="3" fill="#333"/>
                        <circle cx="36" cy="22" r="3" fill="#333"/>
                        <ellipse cx="30" cy="32" rx="4" ry="3" fill="#FFB6C1"/>
                        <rect x="22" y="42" width="16" height="20" rx="5" fill="${char.hairColor}"/>
                    </svg>
                </div>
                <div class="item-name">${char.name}</div>
            `;
            card.addEventListener('click', () => this.selectCharacter(char));
            content.appendChild(card);
        });
    }

    renderClothes() {
        const content = document.getElementById('panelContent');
        content.style.gridTemplateColumns = 'repeat(3, 1fr)';
        
        gameData.clothes.forEach(clothes => {
            const card = this.createCard(clothes, 'clothes');
            card.innerHTML = `
                <div style="height: 70px; display: flex; align-items: center; justify-content: center;">
                    <svg width="50" height="60" viewBox="0 0 50 60">
                        <path d="M10 10 L10 50 Q25 45 40 50 L40 10 Q25 5 10 10" fill="${clothes.color}"/>
                        <rect x="15" y="15" width="20" height="12" rx="3" fill="white" opacity="0.3"/>
                    </svg>
                </div>
                <div class="item-name">${clothes.name}</div>
            `;
            card.addEventListener('click', () => this.selectClothes(clothes));
            content.appendChild(card);
        });
    }

    renderScenes() {
        const content = document.getElementById('panelContent');
        content.style.gridTemplateColumns = 'repeat(2, 1fr)';
        
        gameData.scenes.forEach(scene => {
            const card = this.createCard(scene, 'scene');
            card.innerHTML = `
                <div style="height: 70px; ${scene.bg}; display: flex; align-items: center; justify-content: center;">
                    <span style="color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.5); font-weight: bold;">🌅</span>
                </div>
                <div class="item-name">${scene.name}</div>
            `;
            card.addEventListener('click', () => this.selectScene(scene));
            content.appendChild(card);
        });
    }

    renderGallery() {
        const content = document.getElementById('panelContent');
        content.style.gridTemplateColumns = 'repeat(auto-fill, minmax(130px, 1fr))';
        
        if (this.savedOutfits.length === 0) {
            content.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 30px; color: #999;">📭 还没有保存的作品</div>';
            return;
        }

        this.savedOutfits.forEach(outfit => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `<img src="${outfit.preview}" style="width:100%; height:100px; object-fit:cover;"><div style="padding:5px; background:rgba(0,0,0,0.6); color:white; font-size:0.7rem;">${outfit.name}</div>`;
            item.addEventListener('click', () => this.loadOutfit(outfit));
            content.appendChild(item);
        });
    }

    createCard(item, type) {
        const card = document.createElement('div');
        card.className = `item-card${this.isSelected(item, type) ? ' selected' : ''}`;
        card.dataset.type = type;
        card.dataset.id = item.id;
        return card;
    }

    isSelected(item, type) {
        switch(type) {
            case 'character': return this.selectedChar?.id === item.id;
            case 'clothes': return this.selectedClothes?.id === item.id;
            case 'scene': return this.selectedScene?.id === item.id;
            default: return false;
        }
    }

    selectCharacter(char) {
        this.selectedChar = char;
        this.updateCanvas();
        this.showTab('character');
        this.showToast(`已选择 ${char.name}`);
    }

    selectClothes(clothes) {
        this.selectedClothes = clothes;
        this.updateCanvas();
        this.showTab('clothes');
        this.showToast(`已选择 ${clothes.name}`);
    }

    selectScene(scene) {
        this.selectedScene = scene;
        document.getElementById('sceneDisplay').style.background = scene.bg;
        this.showTab('scene');
        this.showToast(`已选择 ${scene.name}`);
    }

    updateCanvas() {
        const display = document.getElementById('characterDisplay');
        if (!this.selectedChar) {
            display.innerHTML = '';
            return;
        }

        display.innerHTML = `
            <svg width="150" height="300" viewBox="0 0 100 200" class="character-svg">
                <circle cx="50" cy="45" r="25" fill="${this.selectedChar.color}"/>
                <circle cx="42" cy="40" r="4" fill="#333"/>
                <circle cx="58" cy="40" r="4" fill="#333"/>
                <ellipse cx="50" cy="55" rx="5" ry="3" fill="#FFB6C1"/>
                <path d="M44 62 Q50 68 56 62" stroke="#FF6B9D" stroke-width="2" fill="none"/>
                <ellipse cx="35" cy="50" rx="5" ry="8" fill="${this.selectedChar.hairColor}"/>
                <ellipse cx="65" cy="50" rx="5" ry="8" fill="${this.selectedChar.hairColor}"/>
                <ellipse cx="50" cy="35" rx="18" ry="12" fill="${this.selectedChar.hairColor}"/>
                <path d="M25 80 L25 130 Q50 125 75 130 L75 80" fill="${this.selectedClothes?.color || '#FF6B9D'}"/>
                <ellipse cx="50" cy="80" rx="25" ry="8" fill="${this.selectedClothes?.color || '#FF6B9D'}"/>
                <path d="M35 130 L30 170 L45 168" fill="#FFD700"/>
                <path d="M65 130 L70 170 L55 168" fill="#FFD700"/>
            </svg>
        `;
    }

    saveOutfit() {
        if (!this.selectedChar) {
            this.showToast('请先选择角色！', 'error');
            return;
        }
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 400;
        
        if (this.selectedScene) {
            const colors = this.selectedScene.bg.match(/#[A-Fa-f0-9]{6}/g);
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, colors[0]);
            gradient.addColorStop(0.5, colors[1]);
            gradient.addColorStop(1, colors[2]);
            ctx.fillStyle = gradient;
        } else {
            ctx.fillStyle = '#87CEEB';
        }
        ctx.fillRect(0, 0, 300, 400);
        
        const preview = canvas.toDataURL();
        const outfit = {
            id: Date.now(),
            name: `搭配${this.savedOutfits.length + 1}`,
            preview,
            char: this.selectedChar,
            clothes: this.selectedClothes,
            scene: this.selectedScene
        };
        
        this.savedOutfits.push(outfit);
        localStorage.setItem('dressup-outfits', JSON.stringify(this.savedOutfits));
        this.showToast('保存成功！');
    }

    loadOutfit(outfit) {
        this.selectedChar = outfit.char;
        this.selectedClothes = outfit.clothes;
        this.selectedScene = outfit.scene;
        if (outfit.scene) this.selectScene(outfit.scene);
        this.updateCanvas();
        this.showTab('character');
    }

    exportData() {
        const data = JSON.stringify(this.savedOutfits, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'dressup-data.json';
        a.click();
        this.showToast('导出成功！');
    }

    reset() {
        this.selectedChar = null;
        this.selectedClothes = null;
        this.selectedScene = null;
        document.getElementById('sceneDisplay').style.background = 'linear-gradient(180deg, #87CEEB, #E0F7FA)';
        document.getElementById('characterDisplay').innerHTML = '';
        this.showTab('character');
        this.showToast('已重置');
    }

    showToast(msg, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<span>${msg}</span>`;
        document.getElementById('toastContainer').appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new DressUpGame();
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => game.showTab(btn.dataset.tab));
    });
});