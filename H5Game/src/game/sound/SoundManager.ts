class SoundManager extends BaseClass {

    bgOn = true;
    effectOn = true;
    //beijing  背景音乐的音量  玩家设置过的话 会读取缓存配置
    public bgVolume: number = 0.5;
    public effectVolume = 0.5;
    bg: SoundBg;
    effect: SoundEffects;
    currBg: string;

    public constructor() {
        super();

        this.bg = new SoundBg();
        this.bg.setVolume(this.bgVolume);
        this.effect = new SoundEffects();
        this.effect.setVolume(this.effectVolume);
    }

    public static ins(): SoundManager {
        return super.ins.call(this);
    };
    /**
     * 播放音效
     * @param effectName
     */
    public playEffect(effectName) {
        if (!this.effectOn)
            return;
        this.effect.play(effectName);
    };
    /**
     * 播放背景音乐
     * @param key
     */
    public playBg(bgName: string) {
        this.currBg = bgName;
        if (!this.bgOn)
            return;
        this.bg.play(bgName);
    };
    /**
     * 停止背景音乐
     */
    public stopBg() {
        this.bg.stop();
    };
    /**
     * 设置音效是否开启
     * @param $isOn
     */
    public setEffectOn($isOn) {
        this.effectOn = $isOn;
    };
    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    public setBgOn($isOn) {
        this.bgOn = $isOn;
        if (!this.bgOn) {
            this.stopBg();
        }
        else {
            if (this.currBg) {
                this.playBg(this.currBg);
            }
        }
    };
    /**
     * 设置背景音乐音量
     * @param volume
     */
    public setBgVolume(volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this.bgVolume = volume;
        this.bg.setVolume(this.bgVolume);
    };
    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    public getBgVolume() {
        return this.bgVolume;
    };
    /**
     * 设置音效音量
     * @param volume
     */
    public setEffectVolume(volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this.effectVolume = volume;
        this.effect.setVolume(this.effectVolume);
    };
    /**
     * 获取音效音量
     * @returns {number}
     */
    public getEffectVolume() {
        return this.effectVolume;
    };
    /**
     * 音乐文件清理时间
     * @type {number}
     */
    public static CLEAR_TIME = 3 * 60 * 1000;
}