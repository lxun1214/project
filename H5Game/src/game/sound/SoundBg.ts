class SoundBg extends BaseSound {

    _currBg: string = "";
    _currSoundChannel: any;
    _currSound: any;
    _volume: number;
    public constructor() {
        super();
    }

	/**
     * 停止当前音乐
     */
    public stop() {
        if (this._currSoundChannel) {
            this._currSoundChannel.stop();
        }
        this._currSoundChannel = null;
        this._currSound = null;
        this._currBg = "";
    };
    /**
     * 播放某个音乐
     * @param effectName
     */
    public play(effectName: string) {
        if (this._currBg == effectName)
            return;
        this.stop();
        this._currBg = effectName;
        var sound = this.getSound(effectName);
        if (sound) {
            this.playSound(sound);
        }
    };
    /**
     * 播放
     * @param sound
     */
    public playSound(sound) {
        this._currSound = sound;
        this._currSoundChannel = this._currSound.play(0, 0);
        this._currSoundChannel.volume = this._volume;
    };
    /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume: number) {
        this._volume = volume;
        if (this._currSoundChannel) {
            this._currSoundChannel.volume = this._volume;
        }
    };
    /**
     * 资源加载完成后处理播放
     * @param key
     */
    public loadedPlay(key) {
        if (this._currBg == key) {
            this.playSound(RES.getRes(key));
        }
    };
    /**
     * 检测一个文件是否要清除
     * @param key
     * @returns {boolean}
     */
    public checkCanClear(key) {
        return this._currBg != key;
    };
}