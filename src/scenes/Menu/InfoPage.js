export default class InfoPage extends Phaser.GameObjects.Container {
    inventoryData;
    constructor(scene, x, y, inventoryData){
        super(scene, x, y);
        this.height = 650;
        this.width = 400;
        this.inventoryData = inventoryData;
        this.potion_btn = this.scene.add.sprite(0,-50,'btn');
        this.weapon_btn = this.scene.add.sprite(0,50,'btn');
        let buttons = this.scene.add.container(this.width/2,0.75*this.height);
        this.add(buttons);
        //potion_btn.setScale(1,1);
        this.potion_btn.setInteractive();
        this.weapon_btn.setInteractive();
        buttons.add([this.potion_btn, this.weapon_btn]);


        this.info = this.scene.add.container(this.width/2, 0.25*this.height);
        this.add(this.info);
        let text =  "Hp: " + inventoryData.char_info.health + "\nAttack: " + inventoryData.char_info.attack;
        text += "\nDefense: " + inventoryData.char_info.defense + "\nWeapon: " + inventoryData.char_info.getWeapon() + "\nPotions: " + inventoryData.char_info.potions;
        this.t = this.scene.add.text(this.width/4, 0, text, {fontSize: '35px'}).setOrigin(0.5,0.5);
        this.t.setFontFamily('CustomFont');
        this.t.setColor('#FFFFFF');
        this.info.add(this.t);

        this.scene.events.on('resume', this.refreshText, this);


        //Botones
        this.selected = -1;
        this.W = scene.input.keyboard.addKey('w', true, true);
        this.S = scene.input.keyboard.addKey('s', true, true);
        this.E = scene.input.keyboard.addKey('e', true, true);

        this.W.on('down', event => {
            this.weapon_btn.setTexture('btn');
            this.potion_btn.setTexture('btn');
            if(this.selected != 1){
                this.selected = 1;
                this.weapon_btn.setTexture('btn_selected');
            }else if(this.selected == 1){
                this.selected = 0;
                this.potion_btn.setTexture('btn_selected');
            }
        })
        this.S.on('down', event => {
            this.weapon_btn.setTexture('btn');
            this.potion_btn.setTexture('btn');
            if(this.selected != 0){
                this.selected = 0;
                this.potion_btn.setTexture('btn_selected');
            }else if(this.selected == 0){
                this.selected = 1;
                this.weapon_btn.setTexture('btn_selected');
            }
        })


        this.E.on('down', event => {
            if(this.selected == 0)
                this.usePotion();
            if(this.selected == 1)
                this.changeWeapon()
        })

    }

    usePotion(){
        let char_info = this.inventoryData.char_info;
        if(char_info.potions > 0 && char_info.health < char_info.max_health){
            char_info.potions--;
            char_info.health += 0.56*char_info.max_health;
            if(char_info.health > char_info.max_health) char_info.health = char_info.max_health;
            this.refreshText();
        }
    }

    changeWeapon(){
        this.scene.scene.launch('ChangeWeaponScene', this.inventoryData);
		this.scene.scene.pause('InventoryScene'); //Se pausa
    }

    refreshText(){
        console.log("Text uptadted");
        let text =  "Hp: " + this.inventoryData.char_info.health + "\nAttack: " + this.inventoryData.char_info.attack;
        text += "\nDefense: " + this.inventoryData.char_info.defense + "\nWeapon: " + this.inventoryData.char_info.getWeapon() + "\nPotions: " + this.inventoryData.char_info.potions;
        this.t.setText(text);
    }
}